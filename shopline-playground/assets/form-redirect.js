document.addEventListener('DOMContentLoaded', function() {
  // 检查URL中是否包含表单提交成功的参数
  const urlParams = new URLSearchParams(window.location.search);
  const formSubmitted = urlParams.get('contact_posted') === 'true';
  
  // 检查成功消息
  const successMessage = document.querySelector('.field__info--success');
  
  if (formSubmitted || successMessage) {
    console.log('表单提交成功，立即跳转...');
    // 立即跳转到感谢页面
    window.location.href = 'https://pkcabinets.myshopline.com/pages/thanks';
  }
  
  // 监听表单提交按钮点击
  const submitButtons = document.querySelectorAll('.contact-form button[type="submit"]');
  submitButtons.forEach(button => {
    button.addEventListener('click', function() {
      // 保存提交状态，因为提交成功后页面会刷新
      sessionStorage.setItem('form_submitted', 'true');
    });
  });
  
  // 检查会话存储中的表单提交状态
  if (sessionStorage.getItem('form_submitted') === 'true') {
    // 清除存储状态
    sessionStorage.removeItem('form_submitted');
    
    // 如果有成功消息，表示表单提交成功
    if (successMessage) {
      window.location.href = 'https://pkcabinets.myshopline.com/pages/thanks';
    }
  }
}); 