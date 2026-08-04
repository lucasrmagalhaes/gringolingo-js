class ListaClasses {
  constructor(dono) {
    this.dono = dono;
  }

  add(...nomes) {
    nomes.forEach(n => this.dono.classes.add(n));
  }

  remove(...nomes) {
    nomes.forEach(n => this.dono.classes.delete(n));
  }

  contains(nome) {
    return this.dono.classes.has(nome);
  }

  toggle(nome, forcar) {
    const ligar = forcar === undefined ? !this.contains(nome) : forcar;
    if (ligar) this.add(nome);
    else this.remove(nome);
    return ligar;
  }
}

function paraCamel(texto) {
  return texto.replace(/-([a-z])/g, (_, letra) => letra.toUpperCase());
}

export class ElementoFalso {
  constructor(tag) {
    this.tagName = String(tag).toUpperCase();
    this.classes = new Set();
    this.atributos = {};
    this.dataset = {};
    this.nos = [];
    this.pai = null;
    this.ouvintes = {};
    this.value = '';
    this.disabled = false;
    this.focado = false;
    this.classList = new ListaClasses(this);
  }

  get className() {
    return [...this.classes].join(' ');
  }

  set className(valor) {
    this.classes = new Set(String(valor).split(/\s+/).filter(Boolean));
  }

  get children() {
    return this.nos.filter(n => n instanceof ElementoFalso);
  }

  get childNodes() {
    return [...this.nos];
  }

  get textContent() {
    return this.nos.map(n => (n instanceof ElementoFalso ? n.textContent : String(n))).join('');
  }

  set textContent(valor) {
    this.nos = valor === '' || valor == null ? [] : [String(valor)];
  }

  setAttribute(nome, valor) {
    this.atributos[nome] = String(valor);
    if (nome.startsWith('data-')) this.dataset[paraCamel(nome.slice(5))] = String(valor);
  }

  getAttribute(nome) {
    return Object.prototype.hasOwnProperty.call(this.atributos, nome) ? this.atributos[nome] : null;
  }

  removeAttribute(nome) {
    delete this.atributos[nome];
  }

  append(...nos) {
    nos.forEach(n => {
      if (n instanceof ElementoFalso) n.pai = this;
      this.nos.push(n);
    });
  }

  appendChild(no) {
    this.append(no);
    return no;
  }

  remove() {
    if (!this.pai) return;
    this.pai.nos = this.pai.nos.filter(n => n !== this);
    this.pai = null;
  }

  addEventListener(tipo, fn) {
    (this.ouvintes[tipo] ??= []).push(fn);
  }

  removeEventListener(tipo, fn) {
    this.ouvintes[tipo] = (this.ouvintes[tipo] ?? []).filter(x => x !== fn);
  }

  disparar(tipo, extra = {}) {
    const evento = { type: tipo, target: this, stopPropagation() {}, preventDefault() {}, ...extra };
    (this.ouvintes[tipo] ?? []).slice().forEach(fn => fn(evento));
  }

  click() {
    this.disparar('click');
  }

  focus() {
    this.focado = true;
  }

  blur() {
    this.focado = false;
  }

  querySelector() {
    return null;
  }

  querySelectorAll() {
    return [];
  }
}

export function criarArmazenamento() {
  const mapa = new Map();
  return {
    mapa,
    get length() {
      return mapa.size;
    },
    key(i) {
      return [...mapa.keys()][i] ?? null;
    },
    getItem(chave) {
      return mapa.has(String(chave)) ? mapa.get(String(chave)) : null;
    },
    setItem(chave, valor) {
      mapa.set(String(chave), String(valor));
    },
    removeItem(chave) {
      mapa.delete(String(chave));
    },
    clear() {
      mapa.clear();
    }
  };
}

function definir(nome, valor) {
  try {
    Object.defineProperty(globalThis, nome, { value: valor, writable: true, configurable: true, enumerable: true });
  } catch {
    globalThis[nome] = valor;
  }
}

let instalado = false;

export function instalarAmbiente() {
  if (instalado) return globalThis;
  instalado = true;

  definir('window', globalThis);

  definir('localStorage', criarArmazenamento());
  definir('sessionStorage', criarArmazenamento());

  definir('document', {
    createElement: tag => new ElementoFalso(tag),
    createDocumentFragment: () => new ElementoFalso('fragmento'),
    createTextNode: texto => String(texto),
    body: new ElementoFalso('body'),
    head: new ElementoFalso('head'),
    documentElement: new ElementoFalso('html'),
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {},
    removeEventListener: () => {}
  });

  definir('location', {
    origin: 'http://localhost:8123',
    pathname: '/',
    href: 'http://localhost:8123/',
    hash: '',
    search: '',
    reload: () => {},
    assign: () => {},
    replace: () => {}
  });

  definir('fetch', () => Promise.reject(new Error('rede desligada nos testes')));

  definir('speechSynthesis', {
    getVoices: () => [],
    speak: () => {},
    cancel: () => {},
    onvoiceschanged: null
  });

  definir('SpeechSynthesisUtterance', class {
    constructor(texto) {
      this.text = texto;
      this.lang = '';
      this.rate = 1;
      this.voice = null;
    }
  });

  definir('matchMedia', () => ({
    matches: false,
    media: '',
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {}
  }));

  definir('navigator', {
    userAgent: 'node-test',
    language: 'pt-BR',
    languages: ['pt-BR'],
    onLine: true,
    clipboard: { writeText: () => Promise.resolve() }
  });

  definir('AbortController', globalThis.AbortController);

  return globalThis;
}

instalarAmbiente();

export function limparArmazenamento() {
  globalThis.localStorage.clear();
  globalThis.sessionStorage.clear();
}

export function retornoVazio() {
  return {
    aoMudar: () => {},
    aoEnter: () => {},
    aoAuto: () => {}
  };
}

export function hojeIso() {
  return new Date().toISOString().slice(0, 10);
}

export function diasIso(n) {
  return new Date(Date.now() + n * 864e5).toISOString().slice(0, 10);
}
