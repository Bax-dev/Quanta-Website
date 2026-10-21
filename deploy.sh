#!/usr/bin/env sh
# Build and publish the Quanta site: S3 bucket behind CloudFront.
# Hosting is not provisioned yet; pass BUCKET and DIST_ID until it is.
set -eu
cd "$(dirname "$0")"
BUCKET="${BUCKET:?set BUCKET to the S3 bucket for the site}"
DIST_ID="${DIST_ID:?set DIST_ID to the CloudFront distribution id}"
# Absolute origin for canonical URLs, og:image and sitemap.xml, e.g. https://example.com
export SITE_URL="${SITE_URL:-https://quantatechnologies.org}"

yarn build
# CloudFront asks S3 for "/services", not "/services/index.html", so each route's
# prerendered page is also published under its extensionless key.
routes=""
for page in dist/*/index.html; do routes="$routes $(basename "$(dirname "$page")")"; done
set -- --exclude "assets/*"
for route in $routes; do set -- "$@" --exclude "$route"; done

# Hashed assets are immutable; everything else revalidates every 5 minutes.
aws s3 sync dist/assets "s3://$BUCKET/assets" --delete --cache-control "public, max-age=31536000, immutable" --only-show-errors
aws s3 sync dist "s3://$BUCKET" --delete "$@" --cache-control "public, max-age=300, must-revalidate" --only-show-errors
for route in $routes; do
  aws s3 cp "dist/$route/index.html" "s3://$BUCKET/$route" --content-type "text/html; charset=utf-8" --cache-control "public, max-age=300, must-revalidate" --only-show-errors
done
aws cloudfront create-invalidation --distribution-id "$DIST_ID" --paths "/*" --query "Invalidation.[Id,Status]" --output text
echo "Deployed s3://$BUCKET"
