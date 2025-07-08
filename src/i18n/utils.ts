import { ui, defaultLang, showDefaultLang } from "./ui";

export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split("/");
	if (lang in ui) return lang as keyof typeof ui;
	return defaultLang;
}

export function getUrlWithoutLang(url: URL) {
	const [, langOrPath, ...pathLocale] = url.pathname.split("/");

	if (langOrPath in ui) {
		return `/${pathLocale.join("/")}`;
	} else {
		return `/${langOrPath}${pathLocale.length ? "/" + pathLocale.join("/") : ""}`;
	}
}

export function useTranslations(lang: keyof typeof ui) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[lang][key] || ui[defaultLang][key];
	};
}

export function useTranslatedPath(lang: keyof typeof ui) {
	return function translatePath(path: string, l: string = lang) {
		// 如果路径已经包含语言前缀，则不再添加
		if (path.startsWith(`/${l}/`)) {
			return path;
		}
		// 对于中文（默认语言），不添加语言前缀
		if (l === defaultLang) {
			return path;
		}
		// 对于其他语言，添加语言前缀
		return `/${l}${path}`;
	};
}
