# AWS Lambda Deployment Guide

## Prerequisites
- AWS CLI installed and configured
- AWS account with Lambda permissions

## Step 1: Install AWS CLI
```bash
# Download from: https://aws.amazon.com/cli/
aws configure
# Enter your AWS Access Key ID, Secret Access Key, Region (e.g., us-east-1)
```

## Step 2: Create Lambda Deployment Package
```bash
cd lambda
npm install
zip -r lambda-function.zip .
```

## Step 3: Create Lambda Function
```bash
aws lambda create-function \
  --function-name medical-report-analyzer \
  --runtime nodejs18.x \
  --role arn:aws:iam::YOUR-ACCOUNT-ID:role/lambda-execution-role \
  --handler index.handler \
  --zip-file fileb://lambda-function.zip \
  --timeout 30 \
  --memory-size 512
```

## Step 4: Set Environment Variables
```bash
aws lambda update-function-configuration \
  --function-name medical-report-analyzer \
  --environment Variables='{GOOGLE_GENAI_API_KEY=your_api_key_here}'
```

## Step 5: Create API Gateway
1. Go to AWS Console → API Gateway
2. Create REST API
3. Create Resource: `/caption`
4. Create Method: `POST`
5. Integration Type: Lambda Function
6. Lambda Function: `medical-report-analyzer`
7. Enable CORS
8. Deploy API

## Step 6: Update Frontend
Replace `your-lambda-api-url` in `.env.production` with your API Gateway URL

## Alternative: Use Serverless Framework
```bash
npm install -g serverless
# Create serverless.yml in lambda folder
serverless deploy
```