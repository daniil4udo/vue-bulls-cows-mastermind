<template>
  <div id="app">
    <Menu />
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from '@/components/Menu.vue';

export default {
    name: 'Home',
    components: {
        Menu
    }
};

</script>

<style>
@import url(http://fonts.googleapis.com/css?family=Roboto+Mono);
body {
  width: 100%;
}
#app { 

  font-family: "Roboto Mono", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  margin-left: 50px;
  margin-right: 50px  
}
#nav {
  padding: 30px;
}
a:link {
  text-decoration: none;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>


<style lang="scss">

html,
body {
  height: 100%;
}
input[type=button], input[type=submit], input[type=reset] {
  background-color: #127c7d;
  border: none;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
}
input[type=button]:disabled {
  background-color: #dddddd;
}
input[type=text], input[type=number] {
    padding:5px; 
    font-size: 14px;
    border:2px solid #ccc; 
    -webkit-border-radius: 5px;
    border-radius: 5px;
}

input[type=text]:focus {
    border-color:#333;
}
table {
  font-family: 'Roboto Mono';
  margin: 25px auto;
  border-collapse: collapse;
  border: 1px solid #eee;
  border-bottom: 2px solid #3dafb0;
  box-shadow: 0px 0px 20px rgba(0,0,0,0.10),
     0px 10px 20px rgba(0,0,0,0.05),
     0px 20px 20px rgba(0,0,0,0.05),
     0px 30px 20px rgba(0,0,0,0.05);
  tr {
     &:hover {
      background: #f4f4f4;
      
      td {
        color: #555;
      }
    }
  }
  th, td {
    color: #999;
    border: 1px solid #eee;
    padding: 7px 15px;
    border-collapse: collapse;
  }
  th {
    background: #3dafb0;
    color: #fff;
    text-transform: uppercase;
    font-size: 12px;
    &.last {
      border-right: none;
    }
  }
  
}
</style>
