pipeline {
  agent any

  tools {
    nodejs 'NodeJS'
  }

  environment {
    CI = 'false'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        bat 'npm install'
        bat 'npx playwright install chromium'
      }
    }

    stage('Run Playwright tests') {
      steps {
        bat 'npx playwright test'
      }
    }
  }

  post {
    always {
      allure([
        includeProperties: false,
        jdk: '',
        results: [[path: 'allure-results']]
      ])
      publishHTML([
        allowMissing: true,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright HTML Report'
      ])
      archiveArtifacts artifacts: 'allure-results/**, playwright-report/**, test-results/**', allowEmptyArchive: true
    }
  }
}