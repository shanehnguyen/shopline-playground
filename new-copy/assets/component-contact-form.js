// Form languageData form submit
class ContactForm extends HTMLElement {
  constructor() {
    super();
    this.formDom = this.querySelector('form');
    if (!this.formDom) return;
    const btnSubmit = this.formDom.querySelector("button[type='submit']");
    btnSubmit.addEventListener('click', this.languageAssignment.bind(this));
    
    // 添加表单提交事件监听
    this.setupFormSubmitHandler();
  }

  languageAssignment() {
    const inputs = this.formDom.elements;
    const translateInput = this.formDom.querySelector('input[name=_translate]');
    const translate = {};
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      const title = input.getAttribute('title');
      const name = input.getAttribute('name');
      if (/contact|attribute\[[\w]+\]/.test(name)) {
        translate[name] = title;
      }
    }
    translateInput.setAttribute('value', JSON.stringify(translate));
  }
  
  // 设置表单提交处理器
  setupFormSubmitHandler() {
    // 在design-form.html页面才执行此逻辑
    if (!window.location.pathname.includes('design-form')) return;
    
    const form = this.formDom;
    if (!form) return;
    
    form.addEventListener('submit', function(event) {
      // 保存表单是否有效的状态
      const formIsValid = form.checkValidity();
      
      // 如果表单有效，设置本地存储标记
      if (formIsValid) {
        localStorage.setItem('form_submitted', 'true');
      }
    });
    
    // 检查是否刚刚提交了表单
    if (localStorage.getItem('form_submitted') === 'true') {
      // 清除标记
      localStorage.removeItem('form_submitted');
      
      // 如果有成功消息，表示表单提交成功
      const successMessage = form.querySelector('.field__info--success');
      if (successMessage) {
        console.log('表单提交成功，立即跳转...');
        // 立即跳转到感谢页面
        window.location.href = 'https://pkcabinets.myshopline.com/pages/thanks';
      }
    }
  }
}
defineCustomElement('contact-form', () => ContactForm);
