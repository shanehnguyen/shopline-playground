class ProductTableView {
  constructor() {
    this.initQuantityControls();
  }

  initQuantityControls() {
    document.querySelectorAll('.quantity-minus').forEach(button => {
      button.addEventListener('click', this.decreaseQuantity.bind(this));
    });

    document.querySelectorAll('.quantity-plus').forEach(button => {
      button.addEventListener('click', this.increaseQuantity.bind(this));
    });

    // 监听输入框的change事件，同步更新隐藏字段
    document.querySelectorAll('.quantity-input').forEach(input => {
      input.addEventListener('change', this.syncHiddenQuantity.bind(this));
    });
  }

  // 新增：同步数量到隐藏字段
  syncHiddenQuantity(event) {
    const input = event.target;
    const productId = input.dataset.productId;
    const newQuantity = input.value;
    
    // 找到对应商品的表单
    const form = document.querySelector(`#product-form-table-${productId}`);
    if (form) {
      // 更新表单中的隐藏数量字段
      const hiddenQuantity = form.querySelector('input[name="quantity"]');
      if (hiddenQuantity) {
        hiddenQuantity.value = newQuantity;
      }
    }
  }

  decreaseQuantity(event) {
    const input = event.target.closest('.quantity-input-wrapper').querySelector('.quantity-input');
    const currentValue = parseInt(input.value);
    if (currentValue > 1) {
      input.value = currentValue - 1;
      // 触发change事件，这将同时调用syncHiddenQuantity
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  increaseQuantity(event) {
    const input = event.target.closest('.quantity-input-wrapper').querySelector('.quantity-input');
    const currentValue = parseInt(input.value);
    input.value = currentValue + 1;
    // 触发change事件，这将同时调用syncHiddenQuantity
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

// 初始化表格视图
if (document.querySelector('.product-list-table')) {
  document.addEventListener('DOMContentLoaded', () => {
    new ProductTableView();
  });
} 