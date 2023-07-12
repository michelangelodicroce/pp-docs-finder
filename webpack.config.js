resolve: {
    fallback: {
      assert: require.resolve("assert/"),
      os: require.resolve("os-browserify/browser")
    }
  }
  