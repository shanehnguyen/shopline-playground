document.addEventListener('DOMContentLoaded', function() {
  // 找到所有数量选择器
  const quantityInputs = document.querySelectorAll('.quantity-input');
  
  quantityInputs.forEach(input => {
    // 获取产品ID
    const productId = input.dataset.productId;
    if (!productId) return;
    
    // 找到对应的表单
    const formId = `product-form-table-${productId}`;
    const form = document.getElementById(formId);
    if (!form) return;
    
    // 找到表单中的隐藏数量输入
    const hiddenQuantity = form.querySelector('input[name="quantity"]');
    if (!hiddenQuantity) return;
    
    // 设置初始值
    hiddenQuantity.value = input.value;
    
    // 监听数量变化
    input.addEventListener('change', function() {
      hiddenQuantity.value = this.value;
    });
    
    // 监听加减按钮点击
    const minusButton = input.previousElementSibling;
    const plusButton = input.nextElementSibling;
    
    if (minusButton && minusButton.classList.contains('quantity-minus')) {
      minusButton.addEventListener('click', function() {
        // 更新隐藏字段值
        setTimeout(() => {
          hiddenQuantity.value = input.value;
        }, 10);
      });
    }
    
    if (plusButton && plusButton.classList.contains('quantity-plus')) {
      plusButton.addEventListener('click', function() {
        // 更新隐藏字段值
        setTimeout(() => {
          hiddenQuantity.value = input.value;
        }, 10);
      });
    }
  });
}); 