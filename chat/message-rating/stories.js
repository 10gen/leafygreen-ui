import { css as i, cx as l } from '@leafygreen-ui/emotion';
import { useIdAllocator as d } from '@leafygreen-ui/hooks';
import c from '@leafygreen-ui/icon/dist/ThumbsDown';
import u from '@leafygreen-ui/icon/dist/ThumbsUp';
import s, { useDarkMode as f } from '@leafygreen-ui/leafygreen-provider';
import { storybookArgTypes as o, Theme as a } from '@leafygreen-ui/lib';
import { palette as g } from '@leafygreen-ui/palette';
import { focusRing as h, hoverRing as p } from '@leafygreen-ui/tokens';
import { Description as m } from '@leafygreen-ui/typography';
import e, { forwardRef as n, useEffect as t, useState as r } from 'react';
function b(e, n, r) {
  return (
    (n = (function (e) {
      var n = (function (e, n) {
        if ('object' != typeof e || null === e) return e;
        var r = e[Symbol.toPrimitive];
        if (void 0 !== r) {
          var t = r.call(e, n || 'default');
          if ('object' != typeof t) return t;
          throw new TypeError('@@toPrimitive must return a primitive value.');
        }

        return ('string' === n ? String : Number)(e);
      })(e, 'string');
      return 'symbol' == typeof n ? n : String(n);
    })(n)) in e
      ? Object.defineProperty(e, n, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[n] = r),
    e
  );
}

function y() {
  return (
    (y = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var n = 1; n < arguments.length; n++) {
            var r = arguments[n];
            for (var t in r)
              Object.prototype.hasOwnProperty.call(r, t) && (e[t] = r[t]);
          }

          return e;
        }),
    y.apply(this, arguments)
  );
}

function v(e, n) {
  if (null == e) return {};
  var r,
    t,
    a = (function (e, n) {
      if (null == e) return {};
      var r,
        t,
        a = {},
        o = Object.keys(e);
      for (t = 0; t < o.length; t++)
        (r = o[t]), n.indexOf(r) >= 0 || (a[r] = e[r]);
      return a;
    })(e, n);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (t = 0; t < o.length; t++)
      (r = o[t]),
        n.indexOf(r) >= 0 ||
          (Object.prototype.propertyIsEnumerable.call(e, r) && (a[r] = e[r]));
  }

  return a;
}

function k(e, n) {
  return (
    n || (n = e.slice(0)),
    Object.freeze(
      Object.defineProperties(e, { raw: { value: Object.freeze(n) } }),
    )
  );
}

function x(e, n) {
  return (
    (function (e) {
      if (Array.isArray(e)) return e;
    })(e) ||
    (function (e, n) {
      var r =
        null == e
          ? null
          : ('undefined' != typeof Symbol && e[Symbol.iterator]) ||
            e['@@iterator'];
      if (null != r) {
        var t,
          a,
          o,
          i,
          l = [],
          d = !0,
          c = !1;
        try {
          if (((o = (r = r.call(e)).next), 0 === n)) {
            if (Object(r) !== r) return;
            d = !1;
          } else
            for (
              ;
              !(d = (t = o.call(r)).done) && (l.push(t.value), l.length !== n);
              d = !0
            );
        } catch (e) {
          (c = !0), (a = e);
        } finally {
          try {
            if (!d && null != r.return && ((i = r.return()), Object(i) !== i))
              return;
          } finally {
            if (c) throw a;
          }
        }

        return l;
      }
    })(e, n) ||
    (function (e, n) {
      if (!e) return;
      if ('string' == typeof e) return w(e, n);
      var r = Object.prototype.toString.call(e).slice(8, -1);
      'Object' === r && e.constructor && (r = e.constructor.name);
      if ('Map' === r || 'Set' === r) return Array.from(e);
      if (
        'Arguments' === r ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
      )
        return w(e, n);
    })(e, n) ||
    (function () {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
      );
    })()
  );
}

function w(e, n) {
  (null == n || n > e.length) && (n = e.length);
  for (var r = 0, t = new Array(n); r < n; r++) t[r] = e[r];
  return t;
}
var j,
  O,
  E,
  N,
  T,
  M,
  S,
  C,
  P,
  A =
    (b(
      (E = {}),
      a.Dark,
      i(
        j ||
          (j = k([
            '\n    border-color: ',
            ';\n    background: ',
            ';\n    &:hover {\n      border-color: ',
            ';\n      background: ',
            ';\n      box-shadow: none;\n    }\n  ',
          ])),
        g.white,
        g.gray.light2,
        g.white,
        g.gray.light2,
      ),
    ),
    b(
      E,
      a.Light,
      i(
        O ||
          (O = k([
            '\n    background: ',
            ';\n    &:hover {\n      background: ',
            '; // override default hover\n      box-shadow: none;\n    }\n    &:focus-visible {\n      box-shadow: none;\n    }\n  ',
          ])),
        g.black,
        g.black,
      ),
    ),
    E),
  D = i(
    N ||
      (N = k([
        '\n  overflow: hidden; // for ripple\n  display: flex;\n  height: 28px;\n  justify-content: center;\n  align-items: center;\n  gap: 6px;\n  flex-shrink: 0;\n  align-self: stretch;\n  border-radius: 6px;\n  cursor: pointer;\n  position: relative;\n  z-index: 0;\n  border: 1px solid;\n',
      ])),
  ),
  I =
    (b(
      (S = {}),
      a.Dark,
      i(
        T ||
          (T = k([
            '\n    border: 1px solid ',
            ';\n    background: ',
            ';\n    &:hover {\n      box-shadow: ',
            ';\n      background: ',
            ';\n    }\n    &:focus-visible {\n      box-shadow: ',
            ';\n      background: ',
            ';\n    }\n  ',
          ])),
        g.gray.dark1,
        g.gray.dark2,
        p.dark.gray,
        g.gray.dark1,
        h.dark.default,
        g.gray.dark1,
      ),
    ),
    b(
      S,
      a.Light,
      i(
        M ||
          (M = k([
            '\n    border: 1px solid ',
            ';\n    background: ',
            ';\n    &:hover {\n      box-shadow: ',
            ';\n    }\n    &:focus-visible {\n      box-shadow: ',
            ';\n    }\n  ',
          ])),
        g.gray.dark1,
        g.gray.light3,
        p.light.gray,
        h.light.default,
      ),
    ),
    S),
  U = i(
    C ||
      (C = k([
        '\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 4px 12px;\n  height: 100%;\n  cursor: pointer;\n',
      ])),
  );
i(
  P ||
    (P = k([
      '\n  overflow: hidden;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  border-radius: 5px;\n',
    ])),
);
var z,
  R,
  L,
  B = ['id', 'className', 'name', 'children', 'darkMode', 'checked'],
  F = n(function (n, r) {
    var t = n.id,
      a = n.className,
      o = n.name,
      i = n.children,
      d = n.darkMode,
      c = n.checked,
      u = v(n, B),
      s = f(d).theme;
    return e.createElement(
      'div',
      { className: l(D, I[s], b({}, A[s], c), a), ref: r, tabIndex: 0 },
      e.createElement(
        'input',
        y(
          {
            id: t,
            type: 'radio',
            name: o,
            defaultChecked: c,
            'aria-checked': c,
            hidden: !0,
          },
          u,
        ),
      ),
      e.createElement('label', { htmlFor: t, className: U }, i),
    );
  });
F.displayName = 'RadioButton';
var H = i(
    z ||
      (z = k(['\n  display: flex;\n  align-items: center;\n  gap: 12px;\n'])),
  ),
  $ = i(
    R || (R = k(['\n  display: flex;\n  align-items: center;\n  gap: 4px;\n'])),
  ),
  q = function (e, n) {
    return e ? (n ? g.black : g.gray.light2) : n ? g.gray.light3 : g.gray.dark1;
  },
  G = i(L || (L = k(['\n  display: none;\n']))),
  J = [
    'description',
    'className',
    'value',
    'onChange',
    'darkMode',
    'hideThumbsDown',
    'hideThumbsUp',
  ],
  K = n(function (n, t) {
    var a = n.description,
      o = void 0 === a ? 'How was the response?' : a,
      i = n.className,
      g = n.value,
      p = n.onChange,
      h = n.darkMode,
      k = n.hideThumbsDown,
      w = n.hideThumbsUp,
      j = v(n, J),
      O = void 0 !== g,
      E = x(r(), 2),
      N = E[0],
      T = E[1],
      M = f(h).darkMode,
      S = O ? 'liked' === g : 'liked' === N,
      C = O ? 'disliked' === g : 'disliked' === N,
      P = d({ prefix: 'message-rating' }),
      A = function (e) {
        p(e), O || T(e.target.value);
      };

    return e.createElement(
      s,
      { darkMode: M },
      e.createElement(
        'div',
        y({ className: l(H, i) }, j, { ref: t }),
        e.createElement(m, null, o),
        e.createElement(
          'div',
          { className: $ },
          e.createElement(
            F,
            {
              id: 'like-'.concat(P),
              'aria-label': 'Thumbs up this message',
              name: P,
              value: 'liked',
              onChange: A,
              checked: S,
              className: l(b({}, G, w)),
            },
            e.createElement(u, { fill: q(M, S) }),
          ),
          e.createElement(
            F,
            {
              id: 'dislike-'.concat(P),
              name: P,
              value: 'disliked',
              'aria-label': 'Thumbs down this message',
              onChange: A,
              checked: C,
              className: l(b({}, G, k)),
            },
            e.createElement(c, { fill: q(M, C) }),
          ),
        ),
      ),
    );
  });
K.displayName = 'MessageRating';
var Q = ['value'],
  V = {
    title: 'Components/MessageRating',
    component: K,
    args: {
      onChange: function (e) {
        console.log(e);
      },
    },
    argTypes: {
      darkMode: o.darkMode,
      description: { control: 'text' },
      value: { control: 'radio', options: ['liked', 'disliked', 'undefined'] },
    },
  },
  W = function (n) {
    return e.createElement(K, n);
  }.bind({}),
  X = function (n) {
    var a = n.value,
      o = v(n, Q),
      i = x(r(a), 2),
      l = i[0],
      d = i[1];
    t(
      function () {
        d(l);
      },
      [a],
    );
    return e.createElement(
      K,
      y({}, o, {
        value: l,
        onChange: function (e) {
          d(e.target.value);
        },
      }),
    );
  };
X.argTypes = { value: { control: 'none' } };
export { W as Basic, X as Controlled, V as default };
