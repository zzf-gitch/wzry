import { createI18n } from 'vue-i18n';
import ZH from './zh.js';
import EN from './en.js';
import RN from './rn.js';
import AN from './an.js';
import HN from './hn.js';
import DN from './dn.js';
import FN from './fn.js';
import YN from './yn.js';
import YUEN from './yuen.js';
const messages = {
  zh: { ...ZH  },
  en: { ...EN  },
  rn: { ...RN  },
  an: { ...AN  },
  hn: { ...HN  },
  dn: { ...DN  },
  fn: { ...FN  },
  yn: { ...YN  },
  yuen: { ...YUEN  },
};

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'zh',
  messages
});
export default i18n;
