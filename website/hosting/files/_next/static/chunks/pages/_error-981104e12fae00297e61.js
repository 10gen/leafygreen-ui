_N_E = (window.webpackJsonp_N_E = window.webpackJsonp_N_E || []).push([
  [5],
  {
    '0pOA': function (e, t) {
      e.exports = function (e) {
        if (void 0 === e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called",
          );
        return e;
      };
    },
    '2LUv': function (e, t, n) {
      const r = n('m1Oa'),
        o = n('o/EK'),
        a = n('ShTl'),
        i = n('sJOi');

      e.exports = function (e) {
        return r(e) || o(e) || a(e) || i();
      };
    },
    '5YB7': function (e, t, n) {
      const r = n('PbJ5');

      e.exports = function (e, t) {
        if ('function' !== typeof t && null !== t)
          throw new TypeError(
            'Super expression must either be null or a function',
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          t && r(e, t);
      };
    },
    '7osH': function (e, t) {
      function n(t) {
        return (
          (e.exports = n = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e);
              }),
          n(t)
        );
      }
      e.exports = n;
    },
    '9fEB': function (e, t, n) {
      'use strict';
      n('OQL8');
      (t.__esModule = !0), (t.defaultHead = f), (t.default = void 0);
      let r,
        o = (function (e) {
          if (e && e.__esModule) return e;
          if (null === e || ('object' !== typeof e && 'function' !== typeof e))
            return { default: e };
          const t = s();
          if (t && t.has(e)) return t.get(e);
          const n = {},
            r = Object.defineProperty && Object.getOwnPropertyDescriptor;

          for (const o in e)
            if (Object.prototype.hasOwnProperty.call(e, o)) {
              const a = r ? Object.getOwnPropertyDescriptor(e, o) : null;
              a && (a.get || a.set)
                ? Object.defineProperty(n, o, a)
                : (n[o] = e[o]);
            }
          (n.default = e), t && t.set(e, n);
          return n;
        })(n('mXGw')),
        a = (r = n('GlZI')) && r.__esModule ? r : { default: r },
        i = n('9rrO'),
        u = n('bxxT'),
        c = n('vI6Y');

      function s() {
        if ('function' !== typeof WeakMap) return null;
        const e = new WeakMap();
        return (
          (s = function () {
            return e;
          }),
          e
        );
      }

      function f() {
        const e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
          t = [o.default.createElement('meta', { charSet: 'utf-8' })];
        return (
          e ||
            t.push(
              o.default.createElement('meta', {
                name: 'viewport',
                content: 'width=device-width',
              }),
            ),
          t
        );
      }

      function l(e, t) {
        return 'string' === typeof t || 'number' === typeof t
          ? e
          : t.type === o.default.Fragment
          ? e.concat(
              o.default.Children.toArray(t.props.children).reduce(function (
                e,
                t,
              ) {
                return 'string' === typeof t || 'number' === typeof t
                  ? e
                  : e.concat(t);
              },
              []),
            )
          : e.concat(t);
      }

      const p = ['name', 'httpEquiv', 'charSet', 'itemProp'];

      function d(e, t) {
        return e
          .reduce(function (e, t) {
            const n = o.default.Children.toArray(t.props.children);
            return e.concat(n);
          }, [])
          .reduce(l, [])
          .reverse()
          .concat(f(t.inAmpMode))
          .filter(
            (function () {
              const e = new Set(),
                t = new Set(),
                n = new Set(),
                r = {};

              return function (o) {
                let a = !0;

                if (
                  o.key &&
                  'number' !== typeof o.key &&
                  o.key.indexOf('$') > 0
                ) {
                  const i = o.key.slice(o.key.indexOf('$') + 1);
                  e.has(i) ? (a = !1) : e.add(i);
                }

                switch (o.type) {
                  case 'title':
                  case 'base':
                    t.has(o.type) ? (a = !1) : t.add(o.type);
                    break;
                  case 'meta':
                    for (let u = 0, c = p.length; u < c; u++) {
                      const s = p[u];

                      if (o.props.hasOwnProperty(s))
                        if ('charSet' === s) n.has(s) ? (a = !1) : n.add(s);
                        else {
                          const f = o.props[s],
                            l = r[s] || new Set();
                          l.has(f) ? (a = !1) : (l.add(f), (r[s] = l));
                        }
                    }
                }

                return a;
              };
            })(),
          )
          .reverse()
          .map(function (e, t) {
            const n = e.key || t;
            return o.default.cloneElement(e, { key: n });
          });
      }

      function h(e) {
        const t = e.children,
          n = (0, o.useContext)(i.AmpStateContext),
          r = (0, o.useContext)(u.HeadManagerContext);
        return o.default.createElement(
          a.default,
          {
            reduceComponentsToState: d,
            headManager: r,
            inAmpMode: (0, c.isInAmpMode)(n),
          },
          t,
        );
      }

      h.rewind = function () {};

      const y = h;
      t.default = y;
    },
    '9rrO': function (e, t, n) {
      'use strict';
      let r;
      (t.__esModule = !0), (t.AmpStateContext = void 0);
      const o = ((r = n('mXGw')) && r.__esModule
        ? r
        : { default: r }
      ).default.createContext({});
      t.AmpStateContext = o;
    },
    EsAr: function (e, t, n) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        '/_error',
        function () {
          return n('lx8+');
        },
      ]);
    },
    GlZI: function (e, t, n) {
      'use strict';
      const r = n('2LUv'),
        o = n('fwM5'),
        a = n('bkNG'),
        i = n('0pOA'),
        u = n('5YB7'),
        c = n('Y8Bl'),
        s = n('7osH');

      function f(e) {
        const t = (function () {
          if ('undefined' === typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' === typeof Proxy) return !0;

          try {
            return (
              Date.prototype.toString.call(
                Reflect.construct(Date, [], function () {}),
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        })();

        return function () {
          let n,
            r = s(e);
          if (t) {
            const o = s(this).constructor;
            n = Reflect.construct(r, arguments, o);
          } else n = r.apply(this, arguments);
          return c(this, n);
        };
      }
      (t.__esModule = !0), (t.default = void 0);
      const l = n('mXGw'),
        p = !1,
        d = (function (e) {
          u(n, e);
          const t = f(n);

          function n(e) {
            let a;
            return (
              o(this, n),
              ((a = t.call(this, e))._hasHeadManager = void 0),
              (a.emitChange = function () {
                a._hasHeadManager &&
                  a.props.headManager.updateHead(
                    a.props.reduceComponentsToState(
                      r(a.props.headManager.mountedInstances),
                      a.props,
                    ),
                  );
              }),
              (a._hasHeadManager =
                a.props.headManager && a.props.headManager.mountedInstances),
              p &&
                a._hasHeadManager &&
                (a.props.headManager.mountedInstances.add(i(a)),
                a.emitChange()),
              a
            );
          }

          return (
            a(n, [
              {
                key: 'componentDidMount',
                value: function () {
                  this._hasHeadManager &&
                    this.props.headManager.mountedInstances.add(this),
                    this.emitChange();
                },
              },
              {
                key: 'componentDidUpdate',
                value: function () {
                  this.emitChange();
                },
              },
              {
                key: 'componentWillUnmount',
                value: function () {
                  this._hasHeadManager &&
                    this.props.headManager.mountedInstances.delete(this),
                    this.emitChange();
                },
              },
              {
                key: 'render',
                value: function () {
                  return null;
                },
              },
            ]),
            n
          );
        })(l.Component);
      t.default = d;
    },
    OQL8: function (e, t) {
      e.exports = function (e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      };
    },
    PbJ5: function (e, t) {
      function n(t, r) {
        return (
          (e.exports = n =
            Object.setPrototypeOf ||
            function (e, t) {
              return (e.__proto__ = t), e;
            }),
          n(t, r)
        );
      }
      e.exports = n;
    },
    ShTl: function (e, t, n) {
      const r = n('z3mR');

      e.exports = function (e, t) {
        if (e) {
          if ('string' === typeof e) return r(e, t);
          let n = Object.prototype.toString.call(e).slice(8, -1);
          return (
            'Object' === n && e.constructor && (n = e.constructor.name),
            'Map' === n || 'Set' === n
              ? Array.from(e)
              : 'Arguments' === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? r(e, t)
              : void 0
          );
        }
      };
    },
    Y8Bl: function (e, t, n) {
      const r = n('pSYS'),
        o = n('0pOA');

      e.exports = function (e, t) {
        return !t || ('object' !== r(t) && 'function' !== typeof t) ? o(e) : t;
      };
    },
    bkNG: function (e, t) {
      function n(e, t) {
        for (let n = 0; n < t.length; n++) {
          const r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }

      e.exports = function (e, t, r) {
        return t && n(e.prototype, t), r && n(e, r), e;
      };
    },
    bxxT: function (e, t, n) {
      'use strict';
      let r;
      (t.__esModule = !0), (t.HeadManagerContext = void 0);
      const o = ((r = n('mXGw')) && r.__esModule
        ? r
        : { default: r }
      ).default.createContext({});
      t.HeadManagerContext = o;
    },
    fwM5: function (e, t) {
      e.exports = function (e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      };
    },
    'lx8+': function (e, t, n) {
      'use strict';
      const r = n('fwM5'),
        o = n('bkNG'),
        a = n('5YB7'),
        i = n('Y8Bl'),
        u = n('7osH');

      function c(e) {
        const t = (function () {
          if ('undefined' === typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' === typeof Proxy) return !0;

          try {
            return (
              Date.prototype.toString.call(
                Reflect.construct(Date, [], function () {}),
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        })();

        return function () {
          let n,
            r = u(e);
          if (t) {
            const o = u(this).constructor;
            n = Reflect.construct(r, arguments, o);
          } else n = r.apply(this, arguments);
          return i(this, n);
        };
      }

      const s = n('mYab');
      (t.__esModule = !0), (t.default = void 0);
      const f = s(n('mXGw')),
        l = s(n('9fEB')),
        p = {
          400: 'Bad Request',
          404: 'This page could not be found',
          405: 'Method Not Allowed',
          500: 'Internal Server Error',
        };

      function d(e) {
        const t = e.res,
          n = e.err;
        return {
          statusCode: t && t.statusCode ? t.statusCode : n ? n.statusCode : 404,
        };
      }

      const h = (function (e) {
        a(n, e);
        const t = c(n);

        function n() {
          return r(this, n), t.apply(this, arguments);
        }

        return (
          o(n, [
            {
              key: 'render',
              value: function () {
                const e = this.props.statusCode,
                  t =
                    this.props.title ||
                    p[e] ||
                    'An unexpected error has occurred';
                return f.default.createElement(
                  'div',
                  { style: y.error },
                  f.default.createElement(
                    l.default,
                    null,
                    f.default.createElement('title', null, e, ': ', t),
                  ),
                  f.default.createElement(
                    'div',
                    null,
                    f.default.createElement('style', {
                      dangerouslySetInnerHTML: { __html: 'body { margin: 0 }' },
                    }),
                    e
                      ? f.default.createElement('h1', { style: y.h1 }, e)
                      : null,
                    f.default.createElement(
                      'div',
                      { style: y.desc },
                      f.default.createElement('h2', { style: y.h2 }, t, '.'),
                    ),
                  ),
                );
              },
            },
          ]),
          n
        );
      })(f.default.Component);
      (t.default = h),
        (h.displayName = 'ErrorPage'),
        (h.getInitialProps = d),
        (h.origGetInitialProps = d);
      var y = {
        error: {
          color: '#000',
          background: '#fff',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
          height: '100vh',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        desc: {
          display: 'inline-block',
          textAlign: 'left',
          lineHeight: '49px',
          height: '49px',
          verticalAlign: 'middle',
        },
        h1: {
          display: 'inline-block',
          borderRight: '1px solid rgba(0, 0, 0,.3)',
          margin: 0,
          marginRight: '20px',
          padding: '10px 23px 10px 0',
          fontSize: '24px',
          fontWeight: 500,
          verticalAlign: 'top',
        },
        h2: {
          fontSize: '14px',
          fontWeight: 'normal',
          lineHeight: 'inherit',
          margin: 0,
          padding: 0,
        },
      };
    },
    m1Oa: function (e, t, n) {
      const r = n('z3mR');

      e.exports = function (e) {
        if (Array.isArray(e)) return r(e);
      };
    },
    mYab: function (e, t) {
      e.exports = function (e) {
        return e && e.__esModule ? e : { default: e };
      };
    },
    'o/EK': function (e, t) {
      e.exports = function (e) {
        if ('undefined' !== typeof Symbol && Symbol.iterator in Object(e))
          return Array.from(e);
      };
    },
    pSYS: function (e, t) {
      function n(t) {
        return (
          'function' === typeof Symbol && 'symbol' === typeof Symbol.iterator
            ? (e.exports = n = function (e) {
                return typeof e;
              })
            : (e.exports = n = function (e) {
                return e &&
                  'function' === typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e;
              }),
          n(t)
        );
      }
      e.exports = n;
    },
    sJOi: function (e, t) {
      e.exports = function () {
        throw new TypeError(
          'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
        );
      };
    },
    vI6Y: function (e, t, n) {
      'use strict';
      (t.__esModule = !0),
        (t.isInAmpMode = i),
        (t.useAmp = function () {
          return i(o.default.useContext(a.AmpStateContext));
        });
      var r,
        o = (r = n('mXGw')) && r.__esModule ? r : { default: r },
        a = n('9rrO');
      function i() {
        const e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.ampFirst,
          n = void 0 !== t && t,
          r = e.hybrid,
          o = void 0 !== r && r,
          a = e.hasQuery;
        return n || (o && void 0 !== a && a);
      }
    },
    x9yg: function (e, t, n) {
      'use strict';
      const r = Object.assign.bind(Object);
      (e.exports = r), (e.exports.default = e.exports);
    },
    z3mR: function (e, t) {
      e.exports = function (e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      };
    },
  },
  [['EsAr', 0, 1]],
]);
