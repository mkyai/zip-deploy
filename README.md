# Zip-deploy-action

Create zip of existing code then send zip to webhook for deployment.

## Usage

By using this action `mkyai/zip-deploy@v1`, you can create zip of existing code then send zip to webhook for deployment via github actions.

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: deploy
        uses: mkyai/zip-deploy@v1
        with:
          webhook: ${{ secrets.DEPLOY_WEBHOOK }}
          secret: ${{ secrets.WEBHOOK_SECRET }} #Optional secret for webhook
```

## License

MIT
