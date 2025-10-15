# DevHub Core

> A lightweight, single-user developer hub with a modular plugin system, job runner, and clean web interface.  
> **Core edition** — built to be small, fast, and extendable. No multi-user complexity, just the essentials.

---

## ✨ What It Does

DevHub Core lets you:
- **Load modules** (plugins) from your file system — enable, configure, and manage them through a UI
- **Run jobs** triggered by modules — queue tasks, stream logs live, track status
- **Store settings** locally with typed schemas and migrations
- **Subscribe to events** via WebSocket for real-time updates in the UI
- **Manage everything** through a modern web dashboard with dark mode support

---

## 🎯 Design Principles

**Single-user, local-first**  
No authentication complexity. One developer, one machine, maximum productivity.

**Module-driven**  
Everything is a plugin. Core stays minimal; extend functionality by adding modules.

**Developer-friendly**  
OpenAPI documentation, typed SDKs, hot reload, clear logs. Built by developers, for developers.

**Future-ready**  
Clean interfaces and portable DAOs make it straightforward to evolve into multi-user editions with Postgres, RBAC, and SSO when needed.

---

## 🏗️ Architecture

### Backend
- **Kotlin 2.x** + **Spring Boot 3.x** for the REST API and WebSocket server
- **SQLite** for local storage (modules, jobs, settings)
- **Flyway** for schema migrations
- **Gradle (KTS)** for build and dependency management

### Frontend
- **Next.js 14** (App Router) + **React 18**
- **Tailwind CSS** + **shadcn/ui** components
- **Zustand** for client state management
- Dark mode via class-based theming

### Tooling
- **pnpm** for fast, efficient package management
- **OpenAPI Codegen** for type-safe API clients
- **Playwright** for end-to-end testing
- **GitHub Actions** for CI/CD
- **Docker Compose** for local development

---

## 📦 Repository Structure

```
devhub-core/
├── apps/
│   ├── backend/          # Spring Boot API + module runtime + job runner
│   └── web/              # Next.js UI
├── packages/
│   ├── sdk-core/         # Kotlin interfaces for building modules
│   └── sdk-js/           # TypeScript client for REST/WS
├── modules/
│   └── hello-world/      # Reference module implementation
└── ops/
    ├── docker/           # Dockerfiles and compose configuration
    └── ci/               # GitHub Actions workflows and scripts
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 20+
- **pnpm** 9+
- **JDK** 21
- **Docker** (optional, but recommended)

### Option 1: Docker Compose (Fastest)

```bash
git clone https://github.com/<you>/devhub-core.git
cd devhub-core
docker compose up --build
```

- **API**: http://localhost:8080
- **OpenAPI docs**: http://localhost:8080/api/docs
- **Web UI**: http://localhost:3000

### Option 2: Local Development

**1. Clone and install dependencies**
```bash
git clone https://github.com/<you>/devhub-core.git
cd devhub-core
pnpm -C apps/web install
```

**2. Start the backend**
```bash
cd apps/backend
./gradlew bootRun
```
API will be available at http://localhost:8080

**3. Start the frontend** (in a new terminal)
```bash
cd apps/web
pnpm dev
```
UI will be available at http://localhost:3000

---

## 📚 API Overview

### REST Endpoints
- `GET /api/health` — Health check
- `GET /api/core/settings` — Get all settings
- `PUT /api/core/settings` — Update settings
- `GET /api/modules` — List all modules
- `POST /api/modules/{id}/enable` — Enable a module
- `POST /api/modules/{id}/disable` — Disable a module
- `GET /api/jobs` — List jobs (filter by status/module)
- `POST /api/jobs` — Trigger a new job
- `GET /api/jobs/{id}` — Get job details
- `GET /api/jobs/{id}/logs` — Stream job logs

### WebSocket Events
Connect to `ws://localhost:8080/ws` to receive:
- `job:update` — Job status changes
- `module:status` — Module lifecycle events
- `core:notice` — System notifications

**Interactive Documentation**: http://localhost:8080/api/docs

---

## 🔌 Building a Module

Modules extend DevHub's functionality. Here's how to create one:

### 1. Create Module Manifest

Create `/modules/my-module/module.json`:

```json
{
  "id": "my-module",
  "name": "My Module",
  "version": "0.1.0",
  "entry": "devhub.modules.mymodule.MyModule",
  "configSchema": {
    "type": "object",
    "properties": {
      "apiKey": { "type": "string", "default": "" },
      "enabled": { "type": "boolean", "default": true }
    }
  }
}
```

### 2. Implement Module Interface

Create your Kotlin class implementing `DevHubModule`:

```kotlin
package devhub.modules.mymodule

import devhub.sdk.core.*

class MyModule : DevHubModule {
    override fun onStart(ctx: ModuleContext) {
        ctx.logger.info("My module started!")
    }

    override fun runJob(request: JobRequest, ctx: ModuleContext): JobResult {
        val input = request.payload["input"] as? String ?: "default"
        ctx.logger.info("Processing: $input")
        
        // Do your work here
        
        return JobResult.ok(mapOf("result" to "processed: $input"))
    }

    override fun onStop(ctx: ModuleContext) {
        ctx.logger.info("My module stopped")
    }
}
```

### 3. Enable and Use

1. Restart DevHub Core
2. Navigate to **Modules** in the UI
3. Find your module and click **Enable**
4. Configure settings if needed
5. Go to **Jobs** → **New Job** to trigger it

---

## ⚙️ Configuration

The backend reads from `apps/backend/src/main/resources/application.yaml` and environment variables.

### Common Environment Variables

```bash
DEVHUB_DB_URL=jdbc:sqlite:./devhub.db
DEVHUB_LOG_LEVEL=INFO
DEVHUB_WS_HEARTBEAT_INTERVAL=30000
```

Settings can also be managed through the UI at **Settings** page.

---

## 🧪 Testing

### Backend Tests
```bash
cd apps/backend
./gradlew test
```
Uses JUnit 5 and Testcontainers for integration tests.

### Frontend Tests
```bash
cd apps/web
pnpm test
```
Uses Vitest and React Testing Library.

### End-to-End Tests
```bash
cd apps/web
pnpm e2e
```
Uses Playwright for full-stack testing.

---

## 🗺️ Roadmap

### ✅ v0.1 — Foundation
- Module discovery and management
- Settings store with typed schemas
- Basic UI shell with dark mode

### ✅ v0.2 — Job System
- Job queue and worker
- Live log streaming via WebSocket
- Job status tracking and history

### 🚧 v0.3 — Developer Experience (Current)
- Kotlin SDK for module development
- TypeScript SDK for API integration
- Comprehensive e2e test suite
- Production-ready Docker images

### 🔮 v1.x+ — Future Editions
- Multi-user support with authentication
- Role-based access control (RBAC)
- SSO integration (OIDC)
- PostgreSQL support
- Module marketplace
- Sandboxed module execution
- Scheduled jobs and cron
- Distributed job runners

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork and clone** the repository
2. **Create a branch**: `feat/<feature-name>` or `fix/<bug-name>`
3. **Follow conventions**:
   - Use [Conventional Commits](https://www.conventionalcommits.org/)
   - Run formatters: `ktlint` (backend), `biome`/`prettier` (frontend)
   - Write tests for new features
4. **Open a Pull Request** with a clear description

### Code Style
- **Backend**: ktlint + detekt
- **Frontend**: ESLint + Biome/Prettier

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 👥 Maintainers

- **Backend**: Tobi ([@ByFlowt](https://github.com/you))
- **Frontend**: Lucas ([@DevKalucas](https://github.com/DevKalucas))

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/ByFlowt/devhub-core/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ByFlowt/devhub-core/discussions)
- **Documentation**: [Wiki](https://github.com/ByFlowt/devhub-core/wiki)

---

**Built with ❤️ for developers who want powerful tools without enterprise complexity.**
