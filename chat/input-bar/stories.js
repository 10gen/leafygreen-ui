import v from '@leafygreen-ui/badge';
import y from '@leafygreen-ui/button';
import { css as k, cx as C } from '@leafygreen-ui/emotion';
import {
  useAutoScroll as E,
  useBackdropClick as S,
  useDynamicRefs as w,
  useForwardedRef as x,
} from '@leafygreen-ui/hooks';
import { createGlyphComponent as F } from '@leafygreen-ui/icon';
import { InputOption as I } from '@leafygreen-ui/input-option';
import O, { useDarkMode as L } from '@leafygreen-ui/leafygreen-provider';
import {
  createUniqueClassName as p,
  getNodeTextContent as d,
  isComponentType as s,
  storybookArgTypes as f,
  Theme as u,
  validateChildren as g,
} from '@leafygreen-ui/lib';
import { palette as G } from '@leafygreen-ui/palette';
import { InferredPolymorphic as K } from '@leafygreen-ui/polymorphic';
import { SearchResultsMenu as P } from '@leafygreen-ui/search-input';
import {
  BaseFontSize as B,
  breakpoints as A,
  focusRing as z,
  fontFamilies as D,
  fontWeights as N,
  spacing as j,
  transitionDuration as M,
  typeScales as T,
} from '@leafygreen-ui/tokens';
import { Overline as R } from '@leafygreen-ui/typography';
import {
  LeafyGreenChatProvider as c,
  useLeafyGreenChatContext as i,
} from '@lg-chat/leafygreen-chat-provider';
import h from 'lodash/isUndefined';
import e, {
  forwardRef as n,
  useCallback as o,
  useEffect as l,
  useMemo as a,
  useRef as r,
  useState as t,
} from 'react';
import m from 'react-keyed-flatten-children';
import b from 'react-textarea-autosize';
function H(e, n) {
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

function U(e) {
  for (var n = 1; n < arguments.length; n++) {
    var r = null != arguments[n] ? arguments[n] : {};
    n % 2
      ? H(Object(r), !0).forEach(function (n) {
          Z(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
      : H(Object(r)).forEach(function (n) {
          Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
        });
  }

  return e;
}

function Z(e, n, r) {
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

function q() {
  return (
    (q = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var n = 1; n < arguments.length; n++) {
            var r = arguments[n];
            for (var t in r)
              Object.prototype.hasOwnProperty.call(r, t) && (e[t] = r[t]);
          }

          return e;
        }),
    q.apply(this, arguments)
  );
}

function V(e, n) {
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

function W(e, n) {
  return (
    n || (n = e.slice(0)),
    Object.freeze(
      Object.defineProperties(e, { raw: { value: Object.freeze(n) } }),
    )
  );
}

function $(e, n) {
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
          o,
          a,
          l,
          i = [],
          c = !0,
          u = !1;
        try {
          if (((a = (r = r.call(e)).next), 0 === n)) {
            if (Object(r) !== r) return;
            c = !1;
          } else
            for (
              ;
              !(c = (t = a.call(r)).done) && (i.push(t.value), i.length !== n);
              c = !0
            );
        } catch (e) {
          (u = !0), (o = e);
        } finally {
          try {
            if (!c && null != r.return && ((l = r.return()), Object(l) !== l))
              return;
          } finally {
            if (u) throw o;
          }
        }

        return i;
      }
    })(e, n) ||
    (function (e, n) {
      if (!e) return;
      if ('string' == typeof e) return _(e, n);
      var r = Object.prototype.toString.call(e).slice(8, -1);
      'Object' === r && e.constructor && (r = e.constructor.name);
      if ('Map' === r || 'Set' === r) return Array.from(e);
      if (
        'Arguments' === r ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
      )
        return _(e, n);
    })(e, n) ||
    (function () {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
      );
    })()
  );
}

function _(e, n) {
  (null == n || n > e.length) && (n = e.length);
  for (var r = 0, t = new Array(n); r < n; r++) t[r] = e[r];
  return t;
}
var J,
  Q,
  X,
  Y,
  ee,
  ne,
  re,
  te,
  oe,
  ae,
  le,
  ie,
  ce,
  ue,
  se,
  de,
  pe,
  ge,
  fe,
  me,
  be,
  he,
  ve,
  ye,
  ke,
  Ce,
  xe = k(J || (J = W(['\n  width: 100%;\n  position: relative;\n']))),
  we = k(
    Q ||
      (Q = W([
        '\n  width: 100%;\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  position: relative;\n  border-radius: 8px;\n  border: 1px solid ',
        ';\n  z-index: 2;\n\n  &:disabled {\n    cursor: not-allowed;\n\n    &:hover,\n    &:active {\n      box-shadow: none;\n    }\n  }\n',
      ])),
    G.gray.base,
  ),
  Ee = k(X || (X = W(['\n  border-color: transparent;\n']))),
  Se =
    (Z(
      (ne = {}),
      u.Dark,
      k(
        Y || (Y = W(['\n    background-color: ', ';\n    color: ', ';\n  '])),
        G.black,
        G.white,
      ),
    ),
    Z(
      ne,
      u.Light,
      k(
        ee ||
          (ee = W(['\n    background-color: ', ';\n    color: black;\n  '])),
        G.white,
      ),
    ),
    ne),
  Oe = k(
    re ||
      (re = W([
        '\n  display: flex;\n  gap: ',
        'px;\n  align-items: center;\n  align-self: top;\n  height: 36px; // hard set to height of textarea\n  padding: ',
        'px 0px ',
        'px ',
        'px;\n  background-color: inherit;\n  border-top-left-radius: inherit;\n  border-bottom-left-radius: inherit;\n',
      ])),
    j[2],
    j[1],
    j[1],
    j[2],
  ),
  Le = k(
    te ||
      (te = W([
        '\n  display: flex;\n  align-items: flex-end;\n  gap: ',
        'px;\n  padding: ',
        'px;\n  background-color: inherit;\n  border-top-right-radius: inherit;\n  border-bottom-right-radius: inherit;\n',
      ])),
    j[2],
    j[1],
  ),
  Pe = k(
    oe ||
      (oe = W([
        '\n  flex: 1;\n  font-size: ',
        'px;\n  font-family: ',
        ';\n  font-weight: ',
        ';\n  height: 36px;\n  padding: ',
        'px;\n  outline: none;\n  border: none;\n  transition: ',
        'ms ease-in-out;\n  transition-property: border-color, box-shadow;\n  overflow-y: scroll;\n  resize: none; // to remove bottom right diagonal lines\n  box-sizing: content-box;\n  line-height: ',
        'px;\n  max-height: 160px;\n  background-color: inherit;\n  color: inherit;\n  margin: 0; // firefox creates margins on textareas - remove it for consistent sizing\n\n  &:disabled {\n    &::placeholder {\n      color: inherit;\n    }\n\n    &:disabled:-webkit-autofill {\n      &,\n      &:hover,\n      &:focus {\n        appearance: none;\n        -webkit-text-fill-color: ',
        ';\n      }\n    }\n  }\n',
      ])),
    B.Body1,
    D.default,
    N.regular,
    j[2],
    M.default,
    T.body1.lineHeight,
    G.gray.base,
  ),
  je =
    (Z(
      (ie = {}),
      u.Dark,
      k(
        ae ||
          (ae = W([
            '\n    color: ',
            ';\n    background-color: ',
            ';\n    border-color: ',
            ';\n  ',
          ])),
        G.gray.dark1,
        G.gray.dark3,
        G.gray.dark2,
      ),
    ),
    Z(
      ie,
      u.Light,
      k(
        le ||
          (le = W([
            '\n    color: ',
            ';\n    background-color: ',
            ';\n    border-color: ',
            ';\n  ',
          ])),
        G.gray.base,
        G.gray.light2,
        G.gray.light1,
      ),
    ),
    ie),
  Be =
    (Z(
      (se = {}),
      u.Dark,
      k(
        ce ||
          (ce = W([
            '\n    background-color: ',
            ';\n    color: ',
            ';\n    &:disabled {\n      ',
            '\n    }\n  ',
          ])),
        G.black,
        G.white,
        je[u.Dark],
      ),
    ),
    Z(
      se,
      u.Light,
      k(
        ue ||
          (ue = W([
            '\n    background-color: ',
            ';\n    color: black;\n    &:disabled {\n      ',
            '\n    }\n    &::placeholder {\n      color: ',
            ';\n    }\n  ',
          ])),
        G.white,
        je[u.Light],
        G.gray.base,
      ),
    ),
    se),
  De = k(de || (de = W(['\n  border-radius: 8px;\n']))),
  Ne = k(
    pe ||
      (pe = W([
        '\n  box-shadow: ',
        ';\n  border-color: transparent;\n  transition: ',
        'ms ease-in-out;\n  transition-property: border-color, box-shadow;\n',
      ])),
    z.light.input,
    M.default,
  ),
  Me = k(
    ge ||
      (ge = W([
        "\n  &:before,\n  &:after {\n    content: '';\n    position: absolute;\n    top: -",
        'px;\n    left: -',
        'px;\n    width: calc(100% + ',
        'px);\n    height: calc(100% + ',
        'px);\n    border-radius: 12px;\n    background-color: ',
        ';\n    background-size: 400% 400%;\n    background-position: 800% 800%; // set final state of animation\n  }\n\n  &:after {\n    animation: 4s animateBg linear;\n  }\n\n  &:before {\n    filter: blur(4px) opacity(0.6);\n    animation: 4s animateBg, animateShadow linear infinite;\n    opacity: 0;\n  }\n\n  @keyframes animateBg {\n    0% {\n      background-position: 400% 400%;\n      background-image: linear-gradient(\n        20deg,\n        ',
        ' 0%,\n        ',
        ' 30%,\n        #00ede0 45%,\n        #00ebc1 75%,\n        #0498ec\n      );\n    }\n    100% {\n      background-position: 0% 0%;\n      background-image: linear-gradient(\n        20deg,\n        ',
        ' 0%,\n        ',
        ' 30%,\n        #00ede0 45%,\n        #00ebc1 75%,\n        #0498ec\n      );\n    }\n  }\n\n  @keyframes animateShadow {\n    0% {\n      opacity: 1;\n    }\n    100% {\n      opacity: 0;\n    }\n  }\n',
      ])),
    4,
    4,
    8,
    8,
    G.blue.light1,
    G.blue.light1,
    G.blue.light1,
    G.blue.light1,
    G.blue.light1,
  ),
  Te = k(fe || (fe = W(['\n  &:hover {\n    box-shadow: none;\n  }\n']))),
  ze = function (e, n) {
    return e === u.Dark
      ? n
        ? G.gray.dark1
        : G.gray.light1
      : n
      ? G.gray.base
      : G.gray.dark1;
  },
  Ae = F('Return', function (n) {
    return e.createElement(
      'svg',
      q(
        {
          width: '16',
          height: '16',
          viewBox: '0 0 16 16',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
        },
        n,
      ),
      e.createElement(
        'g',
        { id: 'Return' },
        e.createElement('path', {
          id: 'Union',
          d: 'M5 2C4.44772 2 4 2.44772 4 3C4 3.55228 4.44772 4 5 4H10C11.3807 4 12.5 5.11929 12.5 6.5C12.5 7.88071 11.3807 9 10 9H5.20328L6.65079 7.75927C7.07012 7.39985 7.11868 6.76855 6.75926 6.34923C6.39983 5.9299 5.76853 5.88134 5.34921 6.24076L1.84921 9.24076C1.62756 9.43074 1.5 9.70809 1.5 10C1.5 10.2919 1.62756 10.5693 1.84921 10.7593L5.34921 13.7593C5.76853 14.1187 6.39983 14.0701 6.75926 13.6508C7.11868 13.2315 7.07012 12.6002 6.65079 12.2408L5.20324 11H10C12.4853 11 14.5 8.98528 14.5 6.5C14.5 4.01472 12.4853 2 10 2H5Z',
          fill: 'currentColor',
        }),
      ),
    );
  }),
  Ge = F('Sparkle', function (n) {
    return e.createElement(
      'svg',
      q(
        {
          width: '16',
          height: '16',
          viewBox: '0 0 16 16',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
        },
        n,
      ),
      e.createElement('path', {
        d: 'M6.27334 2.89343L5.27501 5.88842C5.1749 6.18877 4.93922 6.42445 4.63887 6.52456L1.64388 7.52289C1.18537 7.67573 1.18537 8.32427 1.64388 8.47711L4.63887 9.47544C4.93922 9.57555 5.1749 9.81123 5.27501 10.1116L6.27334 13.1066C6.42618 13.5651 7.07472 13.5651 7.22756 13.1066L8.22589 10.1116C8.326 9.81123 8.56168 9.57555 8.86203 9.47544L11.857 8.47711C12.3155 8.32427 12.3155 7.67573 11.857 7.52289L8.86203 6.52456C8.56168 6.42445 8.326 6.18877 8.22589 5.88842L7.22756 2.89343C7.07472 2.43492 6.42618 2.43492 6.27334 2.89343Z',
        fill: 'currentColor',
      }),
      e.createElement('path', {
        d: 'M12.5469 1.17194L12.3158 1.8651C12.2157 2.16545 11.98 2.40113 11.6797 2.50125L10.9865 2.7323C10.7573 2.80872 10.7573 3.13299 10.9865 3.20941L11.6797 3.44046C11.98 3.54058 12.2157 3.77626 12.3158 4.0766L12.5469 4.76977C12.6233 4.99902 12.9476 4.99902 13.024 4.76977L13.255 4.0766C13.3552 3.77626 13.5908 3.54058 13.8912 3.44046L14.5843 3.20941C14.8136 3.13299 14.8136 2.80872 14.5843 2.7323L13.8912 2.50125C13.5908 2.40113 13.3552 2.16545 13.255 1.8651L13.024 1.17194C12.9476 0.942687 12.6233 0.942687 12.5469 1.17194Z',
        fill: 'currentColor',
      }),
      e.createElement('path', {
        d: 'M12.5469 11.2302L12.3158 11.9234C12.2157 12.2237 11.98 12.4594 11.6797 12.5595L10.9865 12.7906C10.7573 12.867 10.7573 13.1913 10.9865 13.2677L11.6797 13.4988C11.98 13.5989 12.2157 13.8346 12.3158 14.1349L12.5469 14.8281C12.6233 15.0573 12.9476 15.0573 13.024 14.8281L13.255 14.1349C13.3552 13.8346 13.5908 13.5989 13.8912 13.4988L14.5843 13.2677C14.8136 13.1913 14.8136 12.867 14.5843 12.7906L13.8912 12.5595C13.5908 12.4594 13.3552 12.2237 13.255 11.9234L13.024 11.2302C12.9476 11.001 12.6233 11.001 12.5469 11.2302Z',
        fill: 'currentColor',
      }),
    );
  }),
  Fe = [
    'className',
    'textareaProps',
    'onMessageSend',
    'onSubmit',
    'shouldRenderGradient',
    'badgeText',
    'darkMode',
    'disabled',
    'disableSend',
    'children',
    'dropdownFooterSlot',
    'dropdownProps',
  ],
  Ie = n(function (n, c) {
    var u,
      p,
      g,
      f,
      k = n.className,
      j = n.textareaProps,
      B = n.onMessageSend,
      D = n.onSubmit,
      N = n.shouldRenderGradient,
      M = void 0 === N || N,
      T = n.badgeText,
      z = n.darkMode,
      G = n.disabled,
      F = n.disableSend,
      I = n.children,
      K = n.dropdownFooterSlot,
      R = n.dropdownProps,
      H = V(n, Fe),
      W = x(c, null),
      _ = r(null),
      J = r(null),
      Q = r(null),
      X = w({ prefix: 'suggested-prompt' }),
      Y = $(t(!1), 2),
      ee = Y[0],
      ne = Y[1],
      re = $(
        t(
          null !==
            (u =
              null == j || null === (p = j.value) || void 0 === p
                ? void 0
                : p.toString()) && void 0 !== u
            ? u
            : '',
        ),
        2,
      ),
      te = re[0],
      oe = re[1],
      ae = $(t(!1), 2),
      le = ae[0],
      ie = ae[1],
      ce = $(t(void 0), 2),
      ue = ce[0],
      se = ce[1],
      de = X(''.concat(ue)),
      pe = $(t(!1), 2),
      ge = pe[0],
      fe = pe[1],
      me = L(z),
      be = me.darkMode,
      he = me.theme,
      ve = i().containerWidth,
      ye = M && ee && !G,
      ke = function () {
        return F || G || '' === te;
      },
      Ce = !h(I),
      Ie = o(
        function () {
          var n = 0,
            r = m(I).map(function r(t) {
              if (s(t, 'SuggestedPrompt')) {
                var o,
                  a = (n += 1) - 1,
                  l = d(t);
                return e.cloneElement(
                  t,
                  U(
                    U({}, t.props),
                    {},
                    {
                      id: 'suggested-prompt-'.concat(a),
                      key: 'suggested-prompt-'.concat(a),
                      ref:
                        null !== (o = t.props.ref) && void 0 !== o
                          ? o
                          : null == X
                          ? void 0
                          : X(''.concat(a)),
                      highlighted: a === ue,
                      onClick: function (e) {
                        var n, r;
                        null === (n = (r = t.props).onClick) ||
                          void 0 === n ||
                          n.call(r, e),
                          oe(l);
                        var o = setTimeout(function () {
                          var e;
                          null == W ||
                            null === (e = W.current) ||
                            void 0 === e ||
                            e.requestSubmit(),
                            clearTimeout(o);
                        });
                        Ze();
                      },
                    },
                  ),
                );
              }

              if (s(t, 'SuggestedPrompts')) {
                var i = e.Children.map(t.props.children, r);
                if (i && i.length > 0)
                  return e.cloneElement(
                    t,
                    U(U({}, t.props), {}, { children: i }),
                  );
              }
            });
          return { resultsCount: n, updatedChildren: r };
        },
        [I, ue, Q, X, oe],
      ),
      Ke = a(
        function () {
          return Ie();
        },
        [Ie],
      ),
      Re = Ke.updatedChildren,
      He = Ke.resultsCount;
    l(
      function () {
        var e = void 0 !== ve && ve >= A.Mobile;
        e !== ge && fe(e);
      },
      [ve],
    );
    var Ue = function (e) {
        switch (e) {
          case 'first':
            se(0);
            break;
          case 'last':
            se(He);
            break;
          case 'next':
            var n = !h(ue) && ue + 1 < He ? ue + 1 : 0;
            se(n);
            break;
          case 'prev':
            var r = !h(ue) && ue - 1 >= 0 ? ue - 1 : He - 1;
            se(r);
        }
      },
      Ze = function () {
        ie(!1), se(void 0);
      },
      qe = function () {
        return ie(!0);
      };

    return (
      E(de, J, 12),
      S(
        function () {
          Ze();
        },
        [_, J],
        le && Ce,
      ),
      e.createElement(
        O,
        { darkMode: be },
        e.createElement(
          'form',
          q(
            {
              className: C(xe, k),
              onSubmit: function (e) {
                e.preventDefault(),
                  ke() || (B && te && (B(te, e), oe('')), null == D || D(e));
              },
              ref: W,
            },
            H,
          ),
          e.createElement(
            'div',
            {
              className: C(
                De,
                ((g = {}), Z(g, Me, ye), Z(g, Ne, !ye && ee && !G), g),
              ),
              ref: _,
            },
            e.createElement(
              'div',
              {
                className: C(
                  we,
                  Se[he],
                  ((f = {}), Z(f, je[he], G), Z(f, Ee, ee), f),
                ),
              },
              e.createElement(
                'div',
                { className: Oe },
                e.createElement(Ge, { fill: ze(he, G) }),
                T && e.createElement(v, { variant: 'blue' }, T),
              ),
              e.createElement(
                b,
                q(
                  {
                    placeholder: 'Type your message here',
                    value: te,
                    disabled: G,
                  },
                  null != j ? j : {},
                  {
                    className: C(Pe, Be[he], null == j ? void 0 : j.className),
                    onKeyDown: function (e) {
                      var n,
                        r,
                        t =
                          null === (n = J.current) || void 0 === n
                            ? void 0
                            : n.contains(document.activeElement);
                      if (
                        (null === (r = _.current) || void 0 === r
                          ? void 0
                          : r.contains(document.activeElement)) ||
                        t
                      )
                        switch (e.key) {
                          case 'Enter':
                            var o, a;
                            if ((e.preventDefault(), h(ue)))
                              if (e.ctrlKey || e.shiftKey) {
                                if (e.ctrlKey || e.shiftKey) {
                                  var l;
                                  !(function (e, n) {
                                    var r = e.value;
                                    e.value = n;
                                    var t =
                                      null == e ? void 0 : e._valueTracker;
                                    t && t.setValue(r),
                                      e.dispatchEvent(
                                        new Event('change', { bubbles: !0 }),
                                      );
                                  })(null == Q ? void 0 : Q.current, te + '\n'),
                                    oe(te + '\n');
                                  var i = new Event('change', { bubbles: !0 });
                                  null === (l = Q.current) ||
                                    void 0 === l ||
                                    l.dispatchEvent(i);
                                }
                              } else
                                null === (o = W.current) ||
                                  void 0 === o ||
                                  o.requestSubmit();
                            else
                              null == de ||
                                null === (a = de.current) ||
                                void 0 === a ||
                                a.click();
                            break;
                          case 'Escape':
                            var c;
                            Ze(),
                              null === (c = Q.current) ||
                                void 0 === c ||
                                c.focus();
                            break;
                          case 'ArrowDown':
                            var u;
                            if (Ce)
                              null === (u = Q.current) ||
                                void 0 === u ||
                                u.focus(),
                                qe(),
                                e.preventDefault(),
                                h(ue) ? se(0) : Ue('next');
                            break;
                          case 'ArrowUp':
                            var s;
                            if (Ce)
                              null === (s = Q.current) ||
                                void 0 === s ||
                                s.focus(),
                                qe(),
                                e.preventDefault(),
                                h(ue) ? se(He - 1) : Ue('prev');
                            break;
                          case 'Tab':
                            le && Ze();
                            break;
                          default:
                            var d;
                            (null == j ? void 0 : j.onKeyDown) &&
                              (null == j ||
                                null === (d = j.onKeyDown) ||
                                void 0 === d ||
                                d.call(j, e)),
                              Ze();
                        }
                    },
                    onChange: function (e) {
                      var n;
                      oe(e.target.value),
                        (null == j ? void 0 : j.onChange) &&
                          (null == j ||
                            null === (n = j.onChange) ||
                            void 0 === n ||
                            n.call(j, e));
                    },
                    onFocus: function (e) {
                      ne(!0), qe();
                    },
                    onBlur: function (e) {
                      ne(!1);
                    },
                    ref: Q,
                  },
                ),
              ),
              e.createElement(
                'div',
                { className: Le },
                e.createElement(
                  y,
                  {
                    size: 'small',
                    rightGlyph: e.createElement(Ae, { fill: ze(he, G) }),
                    type: 'submit',
                    disabled: ke(),
                    className: C(Z({}, Te, ke())),
                  },
                  ge && 'Enter',
                ),
              ),
            ),
          ),
          Ce &&
            e.createElement(
              P,
              q({ open: le, refEl: _, ref: J, footerSlot: K }, R),
              Re,
            ),
        ),
      )
    );
  });
Ie.displayName = 'InputBar';
var Ke,
  Re,
  He,
  Ue,
  Ze,
  qe,
  Ve,
  We = p('suggested-prompt'),
  $e = k(
    me ||
      (me = W([
        '\n  display: block;\n  font-family: ',
        ';\n  font-size: ',
        'px;\n  line-height: ',
        'px;\n  padding: 12px 24px;\n',
      ])),
    D.default,
    T.body1.fontSize,
    j[3],
  ),
  _e =
    (Z(
      (ve = {}),
      u.Light,
      k(
        be || (be = W(['\n    & .', ' {\n      color: ', ';\n    }\n  '])),
        We,
        G.black,
      ),
    ),
    Z(
      ve,
      u.Dark,
      k(
        he || (he = W(['\n    & .', ' {\n      color: ', ';\n    }\n  '])),
        We,
        G.gray.light2,
      ),
    ),
    ve),
  Je =
    (Z(
      (Ce = {}),
      u.Light,
      k(
        ye || (ye = W(['\n    & .', ' {\n      color: ', ';\n    }\n  '])),
        We,
        G.gray.light1,
      ),
    ),
    Z(
      Ce,
      u.Dark,
      k(
        ke || (ke = W(['\n    & .', ' {\n      color: ', ';\n    }\n  '])),
        We,
        G.gray.dark1,
      ),
    ),
    Ce),
  Qe = ['as', 'children', 'disabled', 'className', 'darkMode'],
  Xe = K(function (n, r) {
    var t,
      o = n.as,
      a = void 0 === o ? 'li' : o,
      l = n.children,
      i = n.disabled,
      c = n.className,
      u = n.darkMode,
      s = V(n, Qe),
      p = L(u).theme,
      g = d(l),
      f =
        null !== (t = s['aria-label']) && void 0 !== t
          ? t
          : s['aria-labelledby']
          ? ''
          : g;
    return e.createElement(
      I,
      q({}, s, {
        as: a,
        ref: r,
        className: C($e, _e[p], Z({}, Je[p], i), c),
        disabled: i,
        'aria-labelledby': s['aria-labelledby'],
        'aria-label': f,
      }),
      e.createElement('div', { className: We }, l),
    );
  }, 'SuggestedPrompt');
Xe.displayName = 'SuggestedPrompt';
var Ye =
    (Z(
      (He = {}),
      u.Light,
      k(
        Ke ||
          (Ke = W([
            '\n    & + & {\n      border-top: 1px solid ',
            ';\n    }\n  ',
          ])),
        G.gray.light2,
      ),
    ),
    Z(
      He,
      u.Dark,
      k(
        Re ||
          (Re = W([
            '\n    & + & {\n      border-top: 1px solid ',
            ';\n    }\n  ',
          ])),
        G.gray.dark2,
      ),
    ),
    He),
  en = k(Ue || (Ue = W(['\n  padding: 12px 24px;\n  padding-bottom: 0;\n']))),
  nn =
    (Z(
      (Ve = {}),
      u.Light,
      k(Ze || (Ze = W(['\n    color: ', ';\n  '])), G.gray.dark1),
    ),
    Z(Ve, u.Dark, k(qe || (qe = W(['\n    color: ', ';\n  '])), G.gray.base)),
    Ve),
  rn = ['children', 'label'],
  tn = function (n) {
    var r = n.children,
      t = n.label,
      o = V(n, rn),
      a = g(r, ['SuggestedPrompt', 'SuggestedPrompts']),
      l = L().theme;
    return e.createElement(
      'div',
      { className: Ye[l] },
      e.createElement(
        I,
        q({ 'aria-label': t, isInteractive: !1, className: en }, o),
        e.createElement(R, { className: nn[l] }, t),
      ),
      a,
    );
  };
tn.displayName = 'SuggestedPrompts';
var on = {
    title: 'Components/InputBar',
    component: Ie,
    args: {
      onMessageSend: function (e) {
        console.log('Message sent: '.concat(e));
      },
    },
    argTypes: {
      darkMode: f.darkMode,
      badgeText: { control: 'text' },
      shouldRenderGradient: { control: 'boolean' },
      disabled: { control: 'boolean' },
      disableSend: { control: 'boolean' },
    },
  },
  an = function (n) {
    return e.createElement(
      'div',
      { style: { width: '100%' } },
      e.createElement(c, null, e.createElement(Ie, n)),
    );
  },
  ln = an.bind({}),
  cn = an.bind({});
cn.args = { badgeText: 'Beta' };
var un = an.bind({});
un.args = {
  children: e.createElement(
    e.Fragment,
    null,
    e.createElement(
      tn,
      { label: 'Suggested Prompts' },
      e.createElement(
        Xe,
        {
          onClick: function () {
            console.log('SB: Click Apple');
          },
        },
        'Apple',
      ),
      e.createElement(
        Xe,
        {
          onClick: function () {
            console.log('SB: Click Banana');
          },
        },
        'Banana',
      ),
    ),
    e.createElement(
      tn,
      { label: 'Recent Prompts' },
      e.createElement(
        Xe,
        {
          onClick: function () {
            console.log('SB: Click Oranges');
          },
        },
        'Oranges',
      ),
      e.createElement(
        Xe,
        {
          onClick: function () {
            console.log('SB: Click Grapes');
          },
        },
        'Grapes',
      ),
    ),
  ),
  dropdownProps: {},
};
var sn = an.bind({});
sn.args = {
  dropdownFooterSlot: e.createElement(e.Fragment, null, 'This is a test'),
  children: e.createElement(
    e.Fragment,
    null,
    e.createElement(
      tn,
      { label: 'Suggested Prompts' },
      e.createElement(
        Xe,
        {
          onClick: function () {
            console.log('SB: Click Apple');
          },
        },
        'Apple',
      ),
      e.createElement(
        Xe,
        {
          onClick: function () {
            console.log('SB: Click Banana');
          },
        },
        'Banana',
      ),
    ),
    e.createElement(
      tn,
      { label: 'Recent Prompts' },
      e.createElement(
        Xe,
        {
          onClick: function () {
            console.log('SB: Click Oranges');
          },
        },
        'Oranges',
      ),
      e.createElement(
        Xe,
        {
          onClick: function () {
            console.log('SB: Click Grapes');
          },
        },
        'Grapes',
      ),
    ),
  ),
};
var dn = function (n) {
  var r = $(t(''), 2),
    o = r[0],
    a = r[1];
  return e.createElement(
    'div',
    { style: { width: '100%' } },
    e.createElement(
      c,
      null,
      e.createElement(Ie, {
        onMessageSend: function (e) {
          a(''), console.log('Message sent: '.concat(e));
        },
        textareaProps: {
          value: o,
          onChange: function (e) {
            a(e.target.value);
          },
        },
      }),
    ),
  );
};
export {
  ln as Basic,
  dn as Controlled,
  on as default,
  cn as WithBadge,
  un as WithDropdown,
  sn as WithDropdownAndFooter,
};
