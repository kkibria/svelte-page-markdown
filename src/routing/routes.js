import Home from "../pages/Home.svelte";
import Blog from "../pages/Blog.svelte";
import Article from "../pages/Article.svelte";
import Private from "../pages/Private.svelte";
import Login from "../pages/Login.svelte";
import Error from "../pages/Error.svelte";

export default [
  {
    path: "/",
    component: Home
  },
  {
    path: "/blog",
    component: Blog
  },
  {
    path: "/blog/:id",
    component: Article
  },
  {
    path: "/private",
    component: Private,
    auth: true
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "*",
    component: Error
  }
];
