<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/labels">Labels</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
* {
  box-sizing: border-box;
}
ul, li {
  list-style: none;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: 700;
}
input[type=text] {
  width: 100%;
  outline: none;
  padding: 15px 20px;
  border-radius: 3px;
  border: 3px solid #ddd;
  font-size: 20px;
}
input[type=submit] {
  display: block;
  width: 100%;
  background: #00a1ff;
  color: #fff;
  border: none;
  padding: 20px 10px;
  font-size: 16px;
  border-radius: 3px;
  font-weight: 700;
  letter-spacing: 1px;
  outline: none;
  cursor: pointer;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
