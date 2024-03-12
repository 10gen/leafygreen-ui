import { css as w, cx as O } from '@leafygreen-ui/emotion';
import E, { useDarkMode as M } from '@leafygreen-ui/leafygreen-provider';
import {
  isComponentType as h,
  storybookArgTypes as y,
  Theme as p,
} from '@leafygreen-ui/lib';
import { palette as x } from '@leafygreen-ui/palette';
import { breakpoints as T, spacing as j } from '@leafygreen-ui/tokens';
import { Link as b } from '@leafygreen-ui/typography';
import { Avatar as l, avatarSizes as o, Size as i } from '@lg-chat/avatar';
import { DisclaimerText as s } from '@lg-chat/chat-disclaimer';
import {
  LeafyGreenChatProvider as d,
  useLeafyGreenChatContext as c,
} from '@lg-chat/leafygreen-chat-provider';
import { Message as u } from '@lg-chat/message';
import { WithMessageRating as m } from '@lg-chat/message-feedback/src/InlineMessageFeedback/InlineMessageFeedback.stories';
import {
  MessagePrompt as f,
  MessagePrompts as g,
} from '@lg-chat/message-prompts';
import v from 'prop-types';
import e, {
  forwardRef as t,
  useEffect as r,
  useRef as n,
  useState as a,
} from 'react';
import k from 'react-keyed-flatten-children';
function S(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r);
  }

  return n;
}

function P(e, t, n) {
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

function C() {
  return (
    (C = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }

          return e;
        }),
    C.apply(this, arguments)
  );
}

function B(e, t) {
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

function N(e, t) {
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
    D(e, t) ||
    (function () {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
      );
    })()
  );
}

function A(e) {
  return (
    (function (e) {
      if (Array.isArray(e)) return H(e);
    })(e) ||
    (function (e) {
      if (
        ('undefined' != typeof Symbol && null != e[Symbol.iterator]) ||
        null != e['@@iterator']
      )
        return Array.from(e);
    })(e) ||
    D(e) ||
    (function () {
      throw new TypeError(
        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
      );
    })()
  );
}

function D(e, t) {
  if (e) {
    if ('string' == typeof e) return H(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    return (
      'Object' === n && e.constructor && (n = e.constructor.name),
      'Map' === n || 'Set' === n
        ? Array.from(e)
        : 'Arguments' === n ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
        ? H(e, t)
        : void 0
    );
  }
}

function H(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
var z,
  F,
  R,
  L,
  W,
  U,
  G,
  q,
  $,
  J,
  K,
  Q = [
    { id: 1, messageBody: 'Hi! Ask me anything.', isMongo: !0 },
    {
      id: 2,
      messageBody: 'Can you tell me the answer to this thing?',
      userName: 'Sean Park',
    },
    { id: 3, messageBody: 'This thing is `something`.', isMongo: !0 },
    {
      id: 4,
      messageBody:
        'This should do the trick.\n\n```typescript\ntype HelloWorld = "Hello, world!"\n\nfunction helloWorld() {\nreturn "Hello, world!" satisfies HelloWorld;\n}\n```\n      ',
      isMongo: !0,
      messageRatingProps: {
        onChange: function (e) {
          return console.log('Message 4 was '.concat(e.target.value, '.'));
        },
      },
    },
    {
      id: 5,
      messageBody: 'How about another question?',
      userName: 'Sean Park',
    },
    {
      id: 6,
      messageBody:
        "Sorry, MongoAI can't do that right now.\n\nRefer to [LeafyGreen UI](mongodb.design) or [LeafyGreen UI](mongodb.design) for more details. I'm filling out this space to see if the message will line up to the right side.\n    ",
      isMongo: !0,
      messageRatingProps: {
        onChange: function (e) {
          return console.log('Message 6 was '.concat(e.target.value, '.'));
        },
      },
    },
  ],
  V = w(
    z ||
      (z = N([
        '\n  height: 500px;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n',
      ])),
  ),
  X =
    (P(
      (L = {}),
      p.Dark,
      w(F || (F = N(['\n    background-color: ', ';\n  '])), x.black),
    ),
    P(
      L,
      p.Light,
      w(R || (R = N(['\n    background-color: ', ';\n  '])), x.gray.light3),
    ),
    L),
  Y = w(
    W ||
      (W = N([
        '\n  width: 100%;\n  max-width: ',
        'px;\n  height: 100%;\n  overflow-y: scroll;\n  scroll-behavior: smooth;\n  position: relative;\n  padding: ',
        'px ',
        'px ',
        'px;\n  z-index: 2;\n',
      ])),
    T.Tablet + 2 * (o[i.Default] + j[5] + j[3]),
    j[3],
    j[5],
    j[2],
  ),
  Z =
    (P(
      (q = {}),
      p.Dark,
      w(
        U ||
          (U = N([
            '\n    // https://css-tricks.com/books/greatest-css-tricks/scroll-shadows/\n    background:\n      /* Shadow Cover TOP */ \n      // eslint-disable-next-line Maintain natural line break\n      linear-gradient(',
            ' 30%, ',
            ' 0%) center top,\n      /* Shadow Cover BOTTOM */\n        linear-gradient(',
            ' 0%, ',
            ' 70%) center bottom,\n      /* Shadow TOP */\n        radial-gradient(\n          farthest-side at 50% 0,\n          rgba(0, 0, 0, 0.3),\n          rgba(0, 0, 0, 0)\n        )\n        center top,\n      /* Shadow BOTTOM */\n        radial-gradient(\n          farthest-side at 50% 100%,\n          rgba(0, 0, 0, 0.3),\n          rgba(0, 0, 0, 0)\n        )\n        center bottom;\n    background-repeat: no-repeat;\n    background-size: 100% 16px, 100% 16px, 100% 8px, 100% 8px;\n    background-attachment: local, local, scroll, scroll;\n  ',
          ])),
        x.black,
        x.black,
        x.black,
        x.black,
      ),
    ),
    P(
      q,
      p.Light,
      w(
        G ||
          (G = N([
            '\n    // https://css-tricks.com/books/greatest-css-tricks/scroll-shadows/\n    background:\n      /* Shadow Cover TOP */ \n      // eslint-disable-next-line Maintain natural line break\n      linear-gradient(',
            ' 30%, ',
            ' 0%)\n        center top,\n      /* Shadow Cover BOTTOM */\n        linear-gradient(',
            ' 0%, ',
            ' 30%)\n        center bottom,\n      /* Shadow TOP */\n        radial-gradient(\n          farthest-side at 50% 0,\n          rgba(0, 0, 0, 0.1),\n          rgba(0, 0, 0, 0)\n        )\n        center top,\n      /* Shadow BOTTOM */\n        radial-gradient(\n          farthest-side at 50% 100%,\n          rgba(0, 0, 0, 0.1),\n          rgba(0, 0, 0, 0)\n        )\n        center bottom;\n    background-repeat: no-repeat;\n    background-size: 100% 16px, 100% 16px, 100% 8px, 100% 8px;\n    background-attachment: local, local, scroll, scroll;\n  ',
          ])),
        x.gray.light3,
        x.gray.light3,
        x.gray.light3,
        x.gray.light3,
      ),
    ),
    q),
  _ = w($ || ($ = N(['\n  padding: 0px ', 'px;\n'])), o[i.Small] + j[2]),
  ee = w(J || (J = N(['\n  padding: 0px ', 'px;\n'])), o[i.Default] + j[3]),
  te = w(
    K ||
      (K = N([
        '\n  text-align: center;\n  margin-top: ',
        'px;\n  margin-bottom: ',
        'px;\n',
      ])),
    j[4],
    j[6],
  ),
  ne = ['children', 'darkMode', 'className'],
  re = t(function (t, a) {
    var o = t.children,
      i = t.darkMode,
      l = t.className,
      s = B(t, ne),
      d = c().containerWidth,
      u = M(i),
      m = u.darkMode,
      g = u.theme,
      f = n(null),
      p = k(o).map(function (t) {
        return h(t, 'DisclaimerText')
          ? e.createElement('div', { className: te, key: 'disclaimer-text' }, t)
          : h(t, 'MessagePrompts')
          ? e.createElement(
              'div',
              {
                key: 'message-prompts',
                className: O(_, P({}, ee, !!d && d >= T.Tablet)),
              },
              t,
            )
          : t;
      });
    return (
      r(
        function () {
          f.current && f.current.scrollTo(0, f.current.scrollHeight);
        },
        [o],
      ),
      e.createElement(
        E,
        { darkMode: m },
        e.createElement(
          'div',
          C({}, s, { className: O(V, X[g], l), ref: a }),
          e.createElement('div', { className: O(Z[g], Y), ref: f }, p),
        ),
      )
    );
  });
(re.displayName = 'MessageFeed'), (re.propTypes = { darkMode: v.bool });
var ae = ['children', 'darkMode'],
  oe = ['darkMode'],
  ie = ['darkMode'],
  le = {
    title: 'Components/MessageFeed',
    component: re,
    argTypes: { darkMode: y.darkMode },
    parameters: { default: 'Basic' },
  },
  se = function (t) {
    var n = t.id,
      r = t.isMongo,
      a = t.messageBody,
      o = t.userName,
      i = t.hasMessageRating;
    return e.createElement(
      u,
      {
        key: n,
        sourceType: 'markdown',
        avatar: e.createElement(l, { variant: r ? 'mongo' : 'user' }),
        isSender: !!o,
        messageBody: a,
      },
      0 === n &&
        e.createElement(
          g,
          null,
          e.createElement(
            f,
            { selected: !0 },
            'Can you tell me the answer to this thing?',
          ),
          e.createElement(f, null, 'Can you tell me the answer to that thing?'),
        ),
      i && e.createElement(m, null),
    );
  },
  ce = function (t) {
    t.children;
    var n = t.darkMode,
      r = B(t, ae);
    return e.createElement(
      d,
      null,
      e.createElement(
        re,
        C({ style: { width: 700, height: 400 }, darkMode: n }, r),
        e.createElement(
          s,
          { title: 'Terms and Conditions' },
          "This is a test description. There's also a",
          ' ',
          e.createElement(b, null, 'link inside of it'),
          '.',
        ),
        Q.map(function (t) {
          return e.createElement(se, C({ key: t.id }, t));
        }),
      ),
    );
  }.bind({}),
  de = function (t) {
    t.darkMode;
    var n = B(t, oe),
      r = Q[0];
    return e.createElement(
      d,
      null,
      e.createElement(
        re,
        C({ style: { width: 700, height: 400 } }, n),
        e.createElement(
          s,
          { title: 'Terms and Conditions' },
          "This is a test description. There's also a",
          ' ',
          e.createElement(b, null, 'link inside of it'),
          '.',
        ),
        e.createElement(se, r),
      ),
    );
  },
  ue = function (t) {
    var n = t.darkMode,
      r = B(t, ie),
      o = I(a(Q), 2),
      i = o[0],
      c = o[1],
      m = I(a(Q.length + 1), 2),
      p = m[0],
      h = m[1],
      y = I(a(!1), 2),
      k = y[0],
      v = y[1];
    return e.createElement(
      'div',
      null,
      e.createElement(
        d,
        null,
        e.createElement(
          re,
          C({ style: { width: 700, height: 400 } }, r),
          e.createElement(
            s,
            { title: 'Terms and Conditions' },
            "This is a test description. There's also a",
            ' ',
            e.createElement(b, null, 'link inside of it'),
            '.',
          ),
          i.map(function (t) {
            var r = t,
              a = r.id,
              o = r.isMongo,
              i = r.messageBody,
              s = r.userName;
            return e.createElement(
              e.Fragment,
              null,
              e.createElement(u, {
                key: a,
                sourceType: 'markdown',
                darkMode: n,
                avatar: e.createElement(l, {
                  variant: o ? 'mongo' : 'user',
                  darkMode: n,
                  name: s,
                }),
                isSender: !!s,
                messageBody: i,
              }),
              1 === a &&
                e.createElement(
                  g,
                  null,
                  e.createElement(
                    f,
                    { selected: !0 },
                    'Can you tell me the answer to this thing?',
                  ),
                  e.createElement(
                    f,
                    null,
                    'Can you tell me the answer to that thing?',
                  ),
                ),
            );
          }),
        ),
      ),
      e.createElement(
        'button',
        {
          onClick: function () {
            var e = (function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2
                  ? S(Object(n), !0).forEach(function (t) {
                      P(e, t, n[t]);
                    })
                  : Object.getOwnPropertyDescriptors
                  ? Object.defineProperties(
                      e,
                      Object.getOwnPropertyDescriptors(n),
                    )
                  : S(Object(n)).forEach(function (t) {
                      Object.defineProperty(
                        e,
                        t,
                        Object.getOwnPropertyDescriptor(n, t),
                      );
                    });
              }

              return e;
            })(
              { id: p.toString(), messageBody: 'This is a new message' },
              k
                ? {
                    isMongo: !0,
                    messageRatingProps: {
                      onChange: function (e) {
                        return console.log(
                          'The new message was '.concat(e.target.value, '.'),
                        );
                      },
                    },
                  }
                : { userName: 'Sean Park' },
            );
            c(function (t) {
              return [].concat(A(t), [e]);
            }),
              h(function (e) {
                return e + 1;
              }),
              v(function (e) {
                return !e;
              });
          },
        },
        'Click me to add a message',
      ),
    );
  };
export { ce as Basic, ue as ChangingMessages, le as default, de as OneMessage };
