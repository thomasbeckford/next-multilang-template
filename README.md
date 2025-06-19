# 🌐 Next.js Animated Multilingual CMS Integration Boilerplate

A modern and flexible **Next.js 15 starter template** built for scalable, international web apps.

Includes support for **Sanity CMS**, **internationalization**, **dark/light themes**, **dynamic SEO**, **Tailwind CSS**, **Shadcn UI**, and **Motion** animations.

---

## ✨ Features

### 🤖 AI-Powered Enhancements

- 🌐 **AI-driven multilingual fallback**
  If a post is not available in the selected language, it is automatically translated from the fallback language (e.g., English) using the OpenAI API, without requiring additional content duplication in the CMS.

- ⚡ **On-the-fly content translation**
  Posts can be dynamically translated during fetch if no localized version exists — useful for MVPs and reducing editorial workload.

- 🌍 **Locale detection & routing**
  Detects the user's preferred language via the browser (`Accept-Language` header),
  and enables locale-aware routing with optional URL prefixes (`/en`, `/es`, etc.) using [`next-intl`](https://github.com/amannn/next-intl).

- 🧾 **Sanity CMS with multilingual content**
  Fully integrated with [Sanity.io](https://www.sanity.io/), using localized schemas to manage content in multiple languages directly from the CMS.

- 🌐 **Language switcher**
  Manual language selection with cookie-based persistence.

- 🗂 **Modular CMS structure**
  Clean schema definitions and GROQ queries organized for scalable, multilingual content delivery.

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
