import { css as s, cx as c } from '@leafygreen-ui/emotion';
import d from '@leafygreen-ui/icon/dist/Person';
import { useDarkMode as m } from '@leafygreen-ui/leafygreen-provider';
import { storybookArgTypes as i, Theme as n } from '@leafygreen-ui/lib';
import { MongoDBLogoMark as u } from '@leafygreen-ui/logo';
import { palette as f } from '@leafygreen-ui/palette';
import { breakpoints as l, fontFamilies as o } from '@leafygreen-ui/tokens';
import {
  LeafyGreenChatProvider as a,
  useLeafyGreenChatContext as t,
} from '@lg-chat/leafygreen-chat-provider';
import e, { forwardRef as r } from 'react';
function v(e, r, t) {
  return (
    (r = (function (e) {
      var r = (function (e, r) {
        if ('object' != typeof e || null === e) return e;
        var t = e[Symbol.toPrimitive];
        if (void 0 !== t) {
          var a = t.call(e, r || 'default');
          if ('object' != typeof a) return a;
          throw new TypeError('@@toPrimitive must return a primitive value.');
        }

        return ('string' === r ? String : Number)(e);
      })(e, 'string');
      return 'symbol' == typeof r ? r : String(r);
    })(r)) in e
      ? Object.defineProperty(e, r, {
          value: t,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[r] = t),
    e
  );
}

function p() {
  return (
    (p = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var r = 1; r < arguments.length; r++) {
            var t = arguments[r];
            for (var a in t)
              Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
          }

          return e;
        }),
    p.apply(this, arguments)
  );
}

function g(e, r) {
  if (null == e) return {};
  var t,
    a,
    n = (function (e, r) {
      if (null == e) return {};
      var t,
        a,
        n = {},
        i = Object.keys(e);
      for (a = 0; a < i.length; a++)
        (t = i[a]), r.indexOf(t) >= 0 || (n[t] = e[t]);
      return n;
    })(e, r);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      (t = i[a]),
        r.indexOf(t) >= 0 ||
          (Object.prototype.propertyIsEnumerable.call(e, t) && (n[t] = e[t]));
  }

  return n;
}

function y(e, r) {
  return (
    r || (r = e.slice(0)),
    Object.freeze(
      Object.defineProperties(e, { raw: { value: Object.freeze(r) } }),
    )
  );
}
var b,
  h,
  k,
  z,
  N,
  O,
  j,
  w = 'small',
  E = 'default',
  x = (v((b = {}), E, 52), v(b, w, 40), b),
  M = s(
    h ||
      (h = y([
        '\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  width: 52px;\n  height: 52px;\n  line-height: 1;\n  border-radius: 50%;\n  overflow: hidden;\n  user-select: none;\n  background-color: ',
        ';\n',
      ])),
    f.gray.light1,
  ),
  P = ['className', 'children', 'size', 'sizeOverride'],
  A = r(function (r, t) {
    var a = r.className,
      n = r.children,
      i = r.size,
      o = void 0 === i ? E : i,
      l = r.sizeOverride,
      d = g(r, P),
      m = null != l ? l : x[o];
    return e.createElement(
      'div',
      p(
        {
          className: c(
            M,
            s(
              k ||
                (k = y([
                  '\n            width: ',
                  'px;\n            height: ',
                  'px;\n          ',
                ])),
              m,
              m,
            ),
            a,
          ),
        },
        d,
        { ref: t },
      ),
      n,
    );
  });
A.displayName = 'Avatar';
var S,
  T,
  D,
  L,
  C =
    (v(
      (O = {}),
      n.Dark,
      s(z || (z = y(['\n    background-color: ', ';\n  '])), f.gray.dark2),
    ),
    v(
      O,
      n.Light,
      s(N || (N = y(['\n    background-color: ', ';\n  '])), f.gray.base),
    ),
    O),
  F = s(j || (j = y(['\n  width: 53.8%;\n  height: 53.8%;\n']))),
  I = ['className', 'name', 'darkMode', 'size'],
  U = r(function (r, t) {
    var a = r.className,
      n = r.name,
      i = r.darkMode,
      o = r.size,
      l = void 0 === o ? E : o,
      s = g(r, I),
      u = m(i),
      v = u.darkMode,
      y = u.theme;
    return e.createElement(
      A,
      p(
        { className: c(C[y], a), size: l, 'data-testid': 'fallback-avatar' },
        s,
        { ref: t },
      ),
      e.createElement(d, {
        className: F,
        fill: v ? f.gray.light1 : f.white,
        alt: n,
      }),
    );
  });
U.displayName = 'FallbackAvatar';
var W =
    (v(
      (D = {}),
      n.Dark,
      s(S || (S = y(['\n    background-color: ', ';\n  '])), f.green.dark3),
    ),
    v(
      D,
      n.Light,
      s(T || (T = y(['\n    background-color: ', ';\n  '])), f.black),
    ),
    D),
  q = s(
    L ||
      (L = y([
        '\n  height: 61.5%; // set to percentage to keep it responsive to all sizeOverride values\n',
      ])),
  ),
  B = ['className', 'darkMode', 'size'],
  G = r(function (r, t) {
    var a = r.className,
      n = r.darkMode,
      i = r.size,
      o = void 0 === i ? E : i,
      l = g(r, B),
      s = m(n).theme;
    return e.createElement(
      A,
      p({ className: c(W[s], a), size: o, 'data-testid': 'mongo-avatar' }, l, {
        ref: t,
      }),
      e.createElement(u, { color: 'green-base', className: q }),
    );
  });
G.displayName = 'MongoAvatar';
var H,
  J,
  K,
  Q,
  R = s(
    H ||
      (H = y([
        '\n  background-color: ',
        ';\n  color: ',
        ';\n  font-family: ',
        ';\n',
      ])),
    f.gray.dark1,
    f.white,
    o.default,
  ),
  V =
    (v((Q = {}), E, s(J || (J = y(['\n    font-size: 20px;\n  '])))),
    v(Q, w, s(K || (K = y(['\n    font-size: 15px;\n  '])))),
    Q),
  X = ['className', 'name', 'darkMode', 'size'],
  Y = r(function (r, t) {
    var a = r.className,
      n = r.name,
      i = r.darkMode,
      o = r.size,
      l = void 0 === o ? E : o,
      s = g(r, X),
      d = m(i).darkMode;
    return n
      ? e.createElement(
          A,
          p(
            {
              className: c(R, V[l], a),
              size: l,
              'data-testid': 'user-avatar',
              ref: t,
            },
            s,
          ),
          n
            .split(' ')
            .map(function (e) {
              return e[0];
            })
            .join(''),
        )
      : e.createElement(
          U,
          p({ className: a, darkMode: d, size: l, ref: t }, s),
        );
  });
Y.displayName = 'UserAvatar';
var Z = 'mongo',
  $ = 'user',
  _ = 'default',
  ee = ['variant', 'size'],
  re = r(function (r, a) {
    var n = r.variant,
      i = void 0 === n ? _ : n,
      o = r.size,
      s = g(r, ee),
      c = t().containerWidth,
      d = o || (c && c < l.Tablet) ? w : E;
    switch (i) {
      case Z:
        return e.createElement(G, p({}, s, { size: d, ref: a }));
      case $:
        return e.createElement(Y, p({}, s, { size: d, ref: a }));
      default:
        return e.createElement(U, p({}, s, { size: d, ref: a }));
    }
  });
re.displayName = 'Avatar';
var te = {
    title: 'Components/Avatar',
    component: re,
    argTypes: {
      darkMode: i.darkMode,
      name: { control: 'text' },
      sizeOverride: { control: 'number' },
    },
  },
  ae = function (r) {
    return e.createElement(a, null, e.createElement(re, r));
  }.bind({});
export { ae as Basic, te as default };
