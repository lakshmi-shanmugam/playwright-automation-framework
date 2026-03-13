pipeline {
  agent any

  tools {
    nodejs 'NodeJS'
  }

  environment {
    CI = 'true'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        bat 'npm ci'
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
      archiveArtifacts artifacts: 'allure-results/**, playwright-report/**, test-results/**', allowEmptyArchive: true
    }
  }
}