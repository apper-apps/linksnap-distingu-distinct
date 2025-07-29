import urlData from "@/services/mockData/urls.json";

class URLService {
  constructor() {
    this.storageKey = "linksnap_urls";
    this.initializeStorage();
  }

  initializeStorage() {
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      localStorage.setItem(this.storageKey, JSON.stringify(urlData));
    }
  }

  getData() {
    const stored = localStorage.getItem(this.storageKey);
    return JSON.parse(stored) || [];
  }

  saveData(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  generateShortCode() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async getAll() {
    await this.delay(300);
    const data = this.getData();
    return [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async getById(Id) {
    await this.delay(200);
    const data = this.getData();
    const item = data.find(url => url.Id === Id);
    return item ? { ...item } : null;
  }

validateCustomCode(code) {
    if (!code) return false;
    const regex = /^[a-zA-Z0-9-]+$/;
    return regex.test(code) && code.length >= 3 && code.length <= 20;
  }

  async create(urlData) {
    await this.delay(400);
    const data = this.getData();
    const maxId = data.length > 0 ? Math.max(...data.map(u => u.Id)) : 0;
    
    let shortCode;
    
    // Handle custom code
    if (urlData.customCode) {
      if (!this.validateCustomCode(urlData.customCode)) {
        throw new Error('Invalid custom code format');
      }
      
      // Check if custom code already exists
      if (data.some(u => u.shortCode === urlData.customCode)) {
        throw new Error('Custom code already exists');
      }
      
      shortCode = urlData.customCode;
    } else {
      // Generate random code
      let attempts = 0;
      do {
        shortCode = this.generateShortCode();
        attempts++;
      } while (data.some(u => u.shortCode === shortCode) && attempts < 10);
      
      if (attempts >= 10) {
        throw new Error('Unable to generate unique short code');
      }
    }

    const newUrl = {
      Id: maxId + 1,
      originalUrl: urlData.originalUrl,
      shortCode: shortCode,
      clicks: 0,
      createdAt: new Date().toISOString(),
      lastClickedAt: null
    };

    data.push(newUrl);
    this.saveData(data);
    return { ...newUrl };
  }

  async update(Id, updateData) {
    await this.delay(300);
    const data = this.getData();
    const index = data.findIndex(url => url.Id === Id);
    
    if (index === -1) {
      throw new Error("URL not found");
    }

    data[index] = { ...data[index], ...updateData };
    this.saveData(data);
    return { ...data[index] };
  }

  async incrementClicks(Id) {
    await this.delay(200);
    const data = this.getData();
    const index = data.findIndex(url => url.Id === Id);
    
    if (index === -1) {
      throw new Error("URL not found");
    }

    data[index].clicks += 1;
    data[index].lastClickedAt = new Date().toISOString();
    this.saveData(data);
    return { ...data[index] };
  }

  async delete(Id) {
    await this.delay(300);
    const data = this.getData();
    const filteredData = data.filter(url => url.Id !== Id);
    
    if (filteredData.length === data.length) {
      throw new Error("URL not found");
    }

    this.saveData(filteredData);
    return true;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const urlService = new URLService();