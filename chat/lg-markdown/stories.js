import g, { Language as m } from '@leafygreen-ui/code';
import { css as t, cx as o } from '@leafygreen-ui/emotion';
import a, { useDarkMode as i } from '@leafygreen-ui/leafygreen-provider';
import { storybookArgTypes as n } from '@leafygreen-ui/lib';
import { spacing as b } from '@leafygreen-ui/tokens';
import {
  Body as p,
  H1 as u,
  H2 as s,
  H3 as d,
  InlineCode as c,
  Link as l,
  useUpdatedBaseFontSize as f,
} from '@leafygreen-ui/typography';
import e from 'react';
import r from 'react-markdown';
function h(e, n) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var t = Object.getOwnPropertySymbols(e);
    n &&
      (t = t.filter(function (n) {
        return Object.getOwnPropertyDescriptor(e, n).enumerable;
      })),
      r.push.apply(r, t);
  }

  return r;
}

function y(e) {
  for (var n = 1; n < arguments.length; n++) {
    var r = null != arguments[n] ? arguments[n] : {};
    n % 2
      ? h(Object(r), !0).forEach(function (n) {
          v(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
      : h(Object(r)).forEach(function (n) {
          Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
        });
  }

  return e;
}

function v(e, n, r) {
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

function w() {
  return (
    (w = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var n = 1; n < arguments.length; n++) {
            var r = arguments[n];
            for (var t in r)
              Object.prototype.hasOwnProperty.call(r, t) && (e[t] = r[t]);
          }

          return e;
        }),
    w.apply(this, arguments)
  );
}

function O(e, n) {
  if (null == e) return {};
  var r,
    t,
    o = (function (e, n) {
      if (null == e) return {};
      var r,
        t,
        o = {},
        a = Object.keys(e);
      for (t = 0; t < a.length; t++)
        (r = a[t]), n.indexOf(r) >= 0 || (o[r] = e[r]);
      return o;
    })(e, n);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (t = 0; t < a.length; t++)
      (r = a[t]),
        n.indexOf(r) >= 0 ||
          (Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r]));
  }

  return o;
}

var j,
  k,
  E,
  P = ['children'],
  S = {
    a: function (n) {
      var r = n.children,
        t = n.href;
      return e.createElement(l, { href: t }, r);
    },
    code: function (n) {
      var r,
        t,
        o = n.inline,
        a = n.children,
        i = n.className,
        l = a.join('\n');
      if (o) return e.createElement(c, null, l);
      var u =
        null !==
          (r =
            null == i || null === (t = i.match(/language-(.+)/)) || void 0 === t
              ? void 0
              : t[1]) && void 0 !== r
          ? r
          : 'none';
      return (
        Object.values(m).includes(u) ||
          (console.warn(
            'Unknown code language: '.concat(
              u,
              '. Using the default language of "none" instead.',
            ),
          ),
          (u = 'none')),
        e.createElement(g, { language: u }, l)
      );
    },
    h1: function (n) {
      var r = n.children;
      return e.createElement(u, null, r);
    },
    h2: function (n) {
      var r = n.children;
      return e.createElement(s, null, r);
    },
    h3: function (n) {
      var r = n.children;
      return e.createElement(d, null, r);
    },
    p: function (n) {
      var r = n.children,
        t = O(n, P);
      return e.createElement(p, t, r);
    },
  },
  M = t(
    j ||
      ((k = [
        '\n  h1 + *,\n  h2 + *,\n  h3 + * {\n    margin-top: ',
        'px;\n  }\n\n  p + p {\n    margin-top: ',
        'px;\n  }\n',
      ]),
      E || (E = k.slice(0)),
      (j = Object.freeze(
        Object.defineProperties(k, { raw: { value: Object.freeze(E) } }),
      ))),
    b[3],
    b[2],
  ),
  x = ['children', 'className', 'components', 'darkMode', 'baseFontSize'],
  H = function (n) {
    var t = n.children,
      l = n.className,
      c = n.components,
      u = n.darkMode,
      s = n.baseFontSize,
      d = O(n, x),
      p = i(u).darkMode,
      g = 13 === f(s) ? 14 : 16;
    return e.createElement(
      a,
      { darkMode: p, baseFontSize: g },
      e.createElement(
        r,
        w({ components: y(y({}, S), c), className: o(M, l) }, d),
        t,
      ),
    );
  };
H.displayName = 'LGMarkdown';
var L = {
    title: 'Components/LGMarkdown',
    component: H,
    args: {
      children:
        '\n# Heading 1\n\n## Heading 2\n\n### Heading 3\n\nThis is a paragraph.\n\nEach paragraph can span multiple lines. And have multiple sentences!\n\nA paragraph can also contain formatted text, like *italics* or **bold** words.\n\nYou can link to a URL using markdown link notation, e.g. [LeafyGreen UI](mongodb.design)\n\nIf you want to talk about code in a paragraph, you can use `inline code`. Wow!\n\nOr you can use a markdown code block like this:\n\n```typescript\ntype HelloWorld = "Hello, world!"\n\nfunction helloWorld() {\n  return "Hello, world!" satisfies HelloWorld;\n}\n```\n- [https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs](https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs)\n- [https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs](https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs)\n- [https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs](https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs)\n',
    },
    argTypes: { darkMode: n.darkMode },
  },
  N = function (n) {
    return e.createElement(H, n);
  },
  U = N.bind({}),
  z = N.bind({});
z.args = {
  children:
    '\nThis is a paragraph.\n\n&nbsp;&nbsp;&nbsp;Each paragraph can span multiple lines. And have multiple sentences!\n\n        A paragraph can also contain formatted text, like *italics* or **bold** words.\n\nYou can link to a URL using markdown link notation, e.g. [LeafyGreen UI](mongodb.design)\n\nIf you want to talk about code in a paragraph, you can use `inline code`. Wow!\n',
};
export { U as Basic, L as default, z as WhitespaceContent };
