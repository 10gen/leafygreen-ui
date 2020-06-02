import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import csharp from 'highlight.js/lib/languages/csharp'
import clike from 'highlight.js/lib/languages/c-like'
import go from 'highlight.js/lib/languages/go'
import ini from 'highlight.js/lib/languages/ini'
import java from 'highlight.js/lib/languages/java'
import perl from 'highlight.js/lib/languages/perl'
import php from 'highlight.js/lib/languages/php'
import python from 'highlight.js/lib/languages/python'
import ruby from 'highlight.js/lib/languages/ruby'
import rust from 'highlight.js/lib/languages/rust'
import scala from 'highlight.js/lib/languages/scala'
import swift from 'highlight.js/lib/languages/swift'
import kotlin from 'highlight.js/lib/languages/kotlin'
import objectivec from 'highlight.js/lib/languages/objectivec'
import bash from 'highlight.js/lib/languages/bash'
import shell from 'highlight.js/lib/languages/shell'
import sql from 'highlight.js/lib/languages/sql'
import yaml from 'highlight.js/lib/languages/yaml'
import json from 'highlight.js/lib/languages/json'

export const languageParsers = {
	javascript,
	typescript,
	csharp,
	clike,
	go,
	ini,
	java,
	perl,
	php,
	python,
	ruby,
	rust,
	scala,
	swift,
	kotlin,
	objectivec,
	bash,
	shell,
	sql,
	yaml,
	json,
} as const;

export const SupportedLanguages = {
  JavaScript: 'javascript',
  TypeScript: 'typescript',
  Cs: 'cs', // C#
  Csharp: 'csharp',
  CLike: 'clike',
  Go: 'go',
  Ini: 'ini',
  Java: 'java',
  Perl: 'perl',
  Php: 'php',
  Python: 'python',
  Ruby: 'ruby',
  Rust: 'rust',
  Scala: 'scala',
  Swift: 'swift',
  Kotlin: 'kotlin',
  ObjectiveC: 'objectivec',
  Bash: 'bash',
  Shell: 'shell',
  Sql: 'sql',
  Yaml: 'yaml',
  Json: 'json',
  Graphql: 'graphql',
} as const;

export type SupportedLanguages = typeof SupportedLanguages[keyof typeof SupportedLanguages];