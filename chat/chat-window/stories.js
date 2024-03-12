import { css as v, cx as w } from '@leafygreen-ui/emotion';
import { useDarkMode as x } from '@leafygreen-ui/leafygreen-provider';
import {
  isComponentType as f,
  storybookArgTypes as g,
  Theme as m,
} from '@leafygreen-ui/lib';
import { palette as S } from '@leafygreen-ui/palette';
import { breakpoints as E, spacing as k } from '@leafygreen-ui/tokens';
import { Avatar as o, avatarSizes as r, Size as a } from '@lg-chat/avatar';
import { InputBar as i } from '@lg-chat/input-bar';
import {
  LeafyGreenChatProvider as y,
  useLeafyGreenChatContext as p,
} from '@lg-chat/leafygreen-chat-provider';
import { Message as l } from '@lg-chat/message';
import { MessageFeed as s } from '@lg-chat/message-feed';
import { WithMessageRating as c } from '@lg-chat/message-feedback/src/InlineMessageFeedback/InlineMessageFeedback.stories';
import {
  MessagePrompt as d,
  MessagePrompts as u,
} from '@lg-chat/message-prompts';
import { TitleBar as b } from '@lg-chat/title-bar';
import e, { forwardRef as t, useState as n } from 'react';
import h from 'react-keyed-flatten-children';
function j(e, t, n) {
  return (
    (t = (function (e) {
      var t = (function (e, t) {
        if ('object' != typeof e || null === e) return e;
        var n = e[Symbol.toPrimitive];
        if (void 0 !== n) {
          var r = n.call(e, t || 'default');
          if ('object' != typeof r) return r;
          throw new TypeError('@@toPrimitive must return a primitive value.');
        }

        return ('string' === t ? String : Number)(e);
      })(e, 'string');
      return 'symbol' == typeof t ? t : String(t);
    })(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}

function M() {
  return (
    (M = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }

          return e;
        }),
    M.apply(this, arguments)
  );
}

function O(e, t) {
  if (null == e) return {};
  var n,
    r,
    a = (function (e, t) {
      if (null == e) return {};
      var n,
        r,
        a = {},
        o = Object.keys(e);
      for (r = 0; r < o.length; r++)
        (n = o[r]), t.indexOf(n) >= 0 || (a[n] = e[n]);
      return a;
    })(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (r = 0; r < o.length; r++)
      (n = o[r]),
        t.indexOf(n) >= 0 ||
          (Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n]));
  }

  return a;
}

function C(e, t) {
  return (
    t || (t = e.slice(0)),
    Object.freeze(
      Object.defineProperties(e, { raw: { value: Object.freeze(t) } }),
    )
  );
}

function I(e, t) {
  return (
    (function (e) {
      if (Array.isArray(e)) return e;
    })(e) ||
    (function (e, t) {
      var n =
        null == e
          ? null
          : ('undefined' != typeof Symbol && e[Symbol.iterator]) ||
            e['@@iterator'];
      if (null != n) {
        var r,
          a,
          o,
          i,
          l = [],
          s = !0,
          c = !1;
        try {
          if (((o = (n = n.call(e)).next), 0 === t)) {
            if (Object(n) !== n) return;
            s = !1;
          } else
            for (
              ;
              !(s = (r = o.call(n)).done) && (l.push(r.value), l.length !== t);
              s = !0
            );
        } catch (e) {
          (c = !0), (a = e);
        } finally {
          try {
            if (!s && null != n.return && ((i = n.return()), Object(i) !== i))
              return;
          } finally {
            if (c) throw a;
          }
        }

        return l;
      }
    })(e, t) ||
    B(e, t) ||
    (function () {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
      );
    })()
  );
}

function T(e) {
  return (
    (function (e) {
      if (Array.isArray(e)) return N(e);
    })(e) ||
    (function (e) {
      if (
        ('undefined' != typeof Symbol && null != e[Symbol.iterator]) ||
        null != e['@@iterator']
      )
        return Array.from(e);
    })(e) ||
    B(e) ||
    (function () {
      throw new TypeError(
        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
      );
    })()
  );
}

function B(e, t) {
  if (e) {
    if ('string' == typeof e) return N(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    return (
      'Object' === n && e.constructor && (n = e.constructor.name),
      'Map' === n || 'Set' === n
        ? Array.from(e)
        : 'Arguments' === n ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
        ? N(e, t)
        : void 0
    );
  }
}

function N(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
var A,
  P,
  W,
  H,
  L,
  R,
  D,
  F,
  G,
  U,
  z = [
    { id: 0, messageBody: 'Hi! Ask me anything.', isMongo: !0 },
    {
      id: 1,
      messageBody: 'Can you tell me the answer to this thing?',
      userName: 'Sean Park',
    },
    {
      id: 2,
      messageBody: 'This thing is `something`.',
      isMongo: !0,
      sourceType: 'text',
    },
    {
      id: 3,
      messageBody:
        'This should do the trick.\n\n```typescript\ntype HelloWorld = "Hello, world!"\n\nfunction helloWorld() {\nreturn "Hello, world!" satisfies HelloWorld;\n}\n```\n      ',
      isMongo: !0,
      hasMessageRating: !0,
    },
    {
      id: 4,
      messageBody: 'How about another question?',
      userName: 'Sean Park',
    },
    {
      id: 5,
      messageBody:
        "Sorry, MongoAI can't do that right now.\n\nRefer to [LeafyGreen UI](mongodb.design) or [LeafyGreen UI](mongodb.design) for more details. I'm filling out this space to see if the message will line up to the right side.\n    ",
      isMongo: !0,
      hasMessageRating: !0,
    },
  ],
  q = v(
    A ||
      (A = C([
        '\n  width: 100%;\n  border: 1px solid;\n  border-radius: 8px;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  position: relative;\n',
      ])),
  ),
  $ =
    (j(
      (H = {}),
      m.Dark,
      v(
        P ||
          (P = C([
            '\n    border-color: ',
            ';\n    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);\n    background-color: ',
            ';\n  ',
          ])),
        S.gray.dark2,
        S.black,
      ),
    ),
    j(
      H,
      m.Light,
      v(
        W ||
          (W = C([
            '\n    border-color: ',
            ';\n    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);\n    background: ',
            ';\n  ',
          ])),
        S.gray.light2,
        S.gray.light3,
      ),
    ),
    H),
  J = v(
    L ||
      (L = C([
        '\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n',
      ])),
  ),
  K = v(
    R ||
      (R = C([
        '\n  width: 100%;\n  padding: ',
        'px;\n  padding-top: ',
        'px;\n  display: flex;\n  justify-content: center;\n',
      ])),
    k[5],
    k[3],
  ),
  Q = v(D || (D = C(['\n  padding-top: ', 'px;\n'])), k[2]),
  V = v(F || (F = C(['\n  width: 100%;\n  max-width: ', 'px;\n'])), E.Tablet),
  X = r[a.Default] + k[3];
v(G || (G = C(['\n  padding: 0px ', 'px;\n'])), X),
  v(
    U ||
      (U = C([
        '\n  // InputBar has padding of: avatarPadding + MessageFeed padding to align with MessageContainer\n  padding-left: ',
        'px;\n  padding-right: ',
        'px;\n',
      ])),
    X + k[5],
    X + k[5],
  );
var Y = [
    'children',
    'className',
    'darkMode',
    'title',
    'badgeText',
    'onClose',
    'iconSlot',
  ],
  Z = t(function (t, n) {
    var r = t.children,
      a = t.className,
      o = t.darkMode,
      i = t.title,
      l = t.badgeText,
      s = t.onClose,
      c = t.iconSlot,
      u = O(t, Y),
      d = x(o).theme,
      m = p().containerWidth,
      g = h(r).map(function (t) {
        return f(t, 'InputBar')
          ? e.createElement(
              'div',
              {
                className: w(K, j({}, Q, !!m && m < E.Tablet)),
                key: 'input-bar-container',
              },
              e.createElement('div', { className: V }, t),
            )
          : t;
      });
    return e.createElement(
      'div',
      M({ className: w(q, $[d], a), ref: n }, u),
      e.createElement(b, { title: i, badgeText: l, onClose: s, iconSlot: c }),
      e.createElement('div', { className: J }, g),
    );
  });
Z.displayName = 'ChatWindowContents';
var _ = ['children'],
  ee = t(function (t, n) {
    var r = t.children,
      a = O(t, _);
    return e.createElement(
      y,
      null,
      e.createElement(Z, M({}, a, { ref: n }), r),
    );
  });
ee.displayName = 'ChatWindow';
var te = {
    title: 'Components/ChatWindow',
    component: ee,
    args: { title: 'LG Chat Demo', badgeText: 'Beta' },
    argTypes: { darkMode: g.darkMode },
    parameters: { default: null },
  },
  ne = function (t) {
    var n = t.id,
      r = t.isMongo,
      a = t.messageBody,
      i = t.userName,
      s = t.hasMessageRating;
    return e.createElement(
      l,
      {
        key: n,
        sourceType: 'markdown',
        avatar: e.createElement(o, { variant: r ? 'mongo' : 'user' }),
        isSender: !!i,
        messageBody: a,
      },
      0 === n &&
        e.createElement(
          u,
          null,
          e.createElement(
            d,
            { selected: !0 },
            'Can you tell me the answer to this thing?',
          ),
          e.createElement(d, null, 'Can you tell me the answer to that thing?'),
        ),
      s && e.createElement(c, null),
    );
  },
  re = function (t) {
    var r = I(n(z), 2),
      a = r[0],
      o = r[1];
    return e.createElement(
      ee,
      t,
      e.createElement(
        s,
        null,
        a.map(function (t) {
          return e.createElement(ne, M({ key: t.id }, t));
        }),
      ),
      e.createElement(i, {
        onMessageSend: function (e) {
          var t = { messageBody: e };
          o(function (e) {
            return [].concat(T(e), [t]);
          });
        },
      }),
    );
  }.bind({}),
  ae = function (t) {
    var r = I(n([]), 2),
      a = r[0],
      o = r[1];
    return e.createElement(
      ee,
      t,
      e.createElement(
        s,
        null,
        a.map(function (t) {
          return e.createElement(ne, M({ key: t.id }, t));
        }),
      ),
      e.createElement(i, {
        onMessageSend: function (e) {
          var t = { messageBody: e, userName: 'Sean Park' };
          o(function (e) {
            return [].concat(T(e), [t]);
          });
        },
      }),
    );
  };
export { re as Basic, te as default, ae as Empty };
