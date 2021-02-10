export default {
  pages: [
    'pages/article/article',
    'pages/mine/mine',
    'pages/login/login',
    'pages/register/register'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: "#7A7E83",
		selectedColor: "#EA451C",
		borderStyle: "black",
    backgroundColor: "#ffffff",
    list: [
      {
        pagePath: 'pages/article/article',
        iconPath: 'assets/images/unSelectWrite.png',
        selectedIconPath: 'assets/images/selectWrite.png',
        text:'文章'
      },
      {
        pagePath: 'pages/mine/mine',
        iconPath: 'assets/images/unSelectMine.png',
        selectedIconPath: 'assets/images/selectMine.png',
        text:'我的'
      }
    ]
  }
}
