defineCustomElement('count-down', () => {
  return class CountDown extends HTMLElement {
    constructor() {
      super();
      this.deadline = this.dataset.deadline;
      this.date = new Date(Date.parse(this.deadline)).getTime();

      if (Number.isNaN(this.date)) {
        this.date = new Date(this.deadline.replace(/-/g, '/')).getTime();

        if (Number.isNaN(this.date)) {
          this.unload();
          return;
        }
      }
      this.formatDate();
      this.classList.remove('loading');
      this.interval = setInterval(() => {
        this.formatDate();
      }, 1000);
    }

    formatDate() {
      const targetTime = new Date(this.date).getTime();
      const currentTime = new Date().getTime();
      const differenceVal = (targetTime - currentTime) / 1000;
      if (differenceVal <= 0) {
        this.unload();
        return;
      }
      const result = {
        D: parseInt(differenceVal / 86400, 10),
        H: parseInt((differenceVal % 86400) / 3600, 10),
        M: parseInt((differenceVal % 3600) / 60, 10),
        S: parseInt(differenceVal % 60, 10),
      };

      this.renderDate(result);
    }

    renderDate(date) {
      const units = [
        { key: 'D', label: 'DAYS' },
        { key: 'H', label: 'HOURS' },
        { key: 'M', label: 'MINUTES' },
        { key: 'S', label: 'SECONDS' }
      ];
      
      const html = units.map(({ key, label }) => `
        <span class="countdown-unit">
          <span class="countdown-number">${date[key].toString().padStart(2, '0')}</span>
          <span class="countdown-label">${label}</span>
        </span>
      `).join('');
      
      this.innerHTML = html;
    }

    unload() {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.classList.add('display-none');
    }
  };
});
