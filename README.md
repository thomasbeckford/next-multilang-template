# 🌐 Next.js Animated Multilingual CMS Integration Boilerplate

A modern and flexible **Next.js 15 starter template** built for scalable, international web apps.

Includes support for **Sanity CMS**, **internationalization**, **dark/light themes**, **dynamic SEO**, **Tailwind CSS**, **Shadcn UI**, and **Motion** animations.

---

## ✨ Features

### 🤖 AI-Powered Enhancements

- 🌐 **Automatic multilingual content (OpenAI + Redis)**
  All content is authored in a single language (e.g., English) in Sanity, and automatically translated to other languages using the OpenAI API. Translations are cached in Redis using a `locale + updatedAt` key strategy to avoid repeated requests and reduce cost.

- ⚡ **Generic translation system**
  A reusable `translateWithCache()` function takes any object of text fields (like `title`, `description`, `faq1`, etc.), translates them, and returns a fully localized version along with metadata. Works with any structured content.

- 🌍 **Locale detection & routing**
  Detects the user's preferred language via the browser (`Accept-Language` header),
  and enables locale-aware routing with optional URL prefixes (`/en`, `/es`, etc.) using [`next-intl`](https://github.com/amannn/next-intl).

- 🧾 **Sanity CMS**
  Content is stored once in Sanity, without the need for manually duplicated localized fields. The AI handles translation dynamically.

- 🌐 **Language switcher**
  Manual language selection with cookie-based persistence.

- 🗂 **Modular CMS structure**
  Clean schema definitions and GROQ queries organized for scalable content delivery.

- 🎨 **Tailwind CSS + Shadcn UI**
  Beautiful, accessible components styled with utility-first Tailwind CSS.

- 🌙 **Theme switcher**
  Dark/Light mode toggle with cookie-based persistence.

- 🏷️ **SEO meta tags**
  Dynamically generated using a `getMetadata()` function.

- 🎞️ **Smooth animations**
  Scroll and interaction-based animations powered by [Motion](https://motion.dev/).
  (Using Animate-UI too)

- 📝 **Authentication**
  Protected routes using [Clerk](https://clerk.com/).

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
