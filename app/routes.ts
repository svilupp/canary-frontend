import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("pricing", "routes/pricing.tsx"),
  route("docs", "routes/docs.tsx"),
  route("about", "routes/about.tsx"),
  route("blog", "routes/blog.tsx"),
  route("contact", "routes/contact.tsx"),
  route("careers", "routes/careers.tsx"),
  route("support", "routes/support.tsx"),
  route("privacy", "routes/privacy.tsx"),
  route("terms", "routes/terms.tsx"),
  route("features", "routes/features.tsx"),
  route("changelog", "routes/changelog.tsx"),
  route("skills", "routes/skills.tsx"),
  route("kill-app", "routes/kill-app.tsx"),
  route("logs-clear", "routes/logs-clear.tsx"),
] satisfies RouteConfig;
