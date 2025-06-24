# 🌐 Next.js Animated Multilingual CMS Integration Boilerplate

A modern and flexible **Next.js 15 starter template** built for scalable, international web apps.

Includes support for **Sanity CMS**, **internationalization**, **dark/light themes**, **dynamic SEO**, **Tailwind CSS**, **Shadcn UI**, and **Motion** animations.

---

## ✨ Features

### 🤖 AI-Powered Enhancements

- 🌐 **Automatic multilingual content (OpenAI-powered)**
  All content is authored in a single language (e.g., English) in Sanity or local config files. Static content is translated once at build time using the OpenAI API and stored as JSON files in `public/translations`. Dynamic content (from Sanity) is translated on demand and cached in Redis using a `locale + updatedAt` strategy to reduce cost and improve performance.

- ⚡ **Generic translation system**
  A reusable `translateWithOpenAIOnly()` function is used during build to generate static translation files. For dynamic content (e.g., Sanity), `translateWithCacheSanity()` handles AI translation and Redis caching. Both accept `doNotTranslate` rules for structured fields like icons or slugs.

- 🌍 **Locale detection & routing**
  Detects the user's preferred language via the browser (`Accept-Language` header), and supports locale-aware routing with optional URL prefixes (`/en`, `/es`, etc.) using [`next-intl`](https://github.com/amannn/next-intl).

- 🧾 **Sanity CMS**
  Content is stored once in Sanity in a default language. Translations are automatically generated via OpenAI and cached to Redis per-locale.

- 🗂 **Modular CMS structure**
  Clean and scalable schema definitions with organized GROQ queries.

- 🌐 **Language switcher**
  Manual language selection with cookie-based persistence.

- 🎨 **Tailwind CSS + Shadcn UI**
  Accessible and customizable components using Tailwind utility classes and the [Shadcn](https://ui.shadcn.com) system.

- 🌙 **Theme switcher**
  Light/Dark mode toggle stored in cookies for persistent theming.

- 🏷️ **SEO meta tags**
  Dynamically generated via a `getMetadata()` utility for locale-specific SEO optimization.

- 🎞️ **Smooth animations**
  Scroll and interaction-based animations using [Motion](https://motion.dev) and Animate-UI.

- 📝 **Authentication**
  Secure routes powered by [Clerk](https://clerk.com/) for modern auth.

---

## 🚀 Tech Stack

- [Next.js 15](https://nextjs.org/)
- [Sanity.io](https://www.sanity.io/)
- [next-intl](https://github.com/amannn/next-intl) (for locale detection and routing)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Motion](https://motion.dev/)
- [Clerk](https://clerk.com/)

---

## 🧪 Getting Started

````bash
pnpm install
pnpm dev


## 🧪 Getting Started

```bash
pnpm install
pnpm dev
````

## 📁 Structure Highlights

```
├── app/
├── components/
├── i18n/
├── sanity/
├── styles/
├── public/
└── ...
```

## 👨‍💻 Created by

Made with ❤️ by Thomas Beckford
If you find this useful, feel free to star the repo or reach out!

## 📝 License

MIT
