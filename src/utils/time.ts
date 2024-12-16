// 获取当前时间的函数，用于登录之后的提示信息显示
export const getTime= () => {
    let message = ''
    let hours = new Date().getHours()
    if(hours <= 9) {
      message = '早上'
    }else if(hours <= 12) {
      message = '上午'
    }else if(hours <= 18) {
      message = '下午'
    }else {
      message = '晚上'
    }
    return message
  }