'use strict';
/* 简单的 i18n：dict 查找 + 两级 fallback（不存在的 key 退回 zh，再退回 key 本身）。
 * 语言选择：localStorage('fmgr.lang') → 否则看浏览器 navigator.language。
 * 页面里写死的静态文本通过 data-i18n / data-i18n-title / data-i18n-aria /
 * data-i18n-placeholder 标记，切换时 applyStaticTranslations() 批量替换。
 * 动态文本走 t('key', ...args)，支持 {0} {1} 占位符。
 */

const I18N = {
  zh: {
    // 页面 & 登录
    'app.title': '文件管家',
    'app.brand': '文件管家',
    'login.showPassword': '显示密码',
    'login.hidePassword': '隐藏密码',
    'toolbar.uploadFolder': '上传文件夹',
    'toolbar.newFile': '新文本文件',
    'toolbar.downloadBatch': '打包下载',
    'menu.editText': '编辑',
    'menu.saveText': '保存',
    'dialog.newFile.title': '新建文本文件',
    'dialog.newFile.label': '文件名',
    'toast.savedText': '已保存',
    'toast.moved': '已移动',
    'dialog.confirm.deleteOneSized': '确认将「{0}」（{1}）移到回收站？',
    'dialog.confirm.deleteManySized': '确认将选中的 {0} 项（共约 {1}{2}）移到回收站？',
    'dialog.confirm.unknownDirs': '，含 {0} 个未统计大小的文件夹',
    'trash.summaryWithSize': '共 {0} 项 · {1}',
    'search.scopeHere': '搜索当前目录',
    'search.scopeHome': '搜索整个家目录',
    'search.scopeHint': '在 {0} 下搜索',
    'login.subtitle': '使用系统账户登录',
    'login.username': '用户名',
    'login.password': '密码',
    'login.submit': '登录',
    'login.hint': '仅系统管理员配置在白名单里的账号可以登录',
    'login.error.bad': '用户名或密码错误',
    'login.error.generic': '登录失败',

    // 顶栏
    'topbar.trash': '打开回收站',
    'topbar.theme.toDark': '切换到深色主题',
    'topbar.theme.toLight': '切换到浅色主题',
    'topbar.hidden.show': '显示隐藏文件',
    'topbar.hidden.hide': '隐藏隐藏文件（.开头）',
    'topbar.checks.show': '显示复选框',
    'topbar.checks.hide': '隐藏复选框',
    'topbar.lang.switch': '切换语言',
    'topbar.refresh': '刷新当前目录',
    'topbar.refresh.title': '刷新 (R)',
    'topbar.logout': '退出',
    'topbar.logout.title': '退出登录',

    // 工具栏
    'toolbar.upload': '上传',
    'toolbar.mkdir': '新文件夹',
    'toolbar.search.placeholder': '搜索文件名（回车递归搜索当前目录）',
    'toolbar.search.clear': '清除搜索',
    'toolbar.bulkDelete': '删除',
    'toolbar.download': '下载',
    'toolbar.rename': '改名',
    'toolbar.selection': '已选 {0} 项',

    // 列表表头
    'col.name': '名称',
    'col.size': '大小',
    'col.mtime': '修改时间',
    'col.actions': '操作',
    'col.checkAll': '全选',
    'sort.byName': '按名称排序',
    'sort.bySize': '按大小排序',
    'sort.byMtime': '按修改时间排序',

    // 列表状态
    'list.loading': '加载中…',
    'list.empty': '此目录为空',
    'list.loadFailed': '加载失败：{0}',
    'list.searchLocalEmpty': '当前目录无匹配。按 Enter 递归搜索子目录。',
    'list.searchGlobalEmpty': '未找到匹配「{0}」的文件',
    'list.searchingDots': '搜索中…',

    // 拖拽 / 上传
    'drop.hint': '释放以上传到此文件夹',

    // 状态栏
    'status.summary': '{0} 个文件夹, {1} 个文件',
    'status.root': '根目录: {0}',

    // 统计面板
    'stats.title': '家目录统计',
    'stats.toggleTitle': '点击折叠/展开',
    'stats.refresh': '重新计算统计',
    'stats.refreshTitle': '重新计算',
    'stats.label.total': '总占用',
    'stats.label.files': '文件数',
    'stats.label.dirs': '文件夹',
    'stats.label.recent': '近 {0} 天修改',
    'stats.section.types': '按类型分布',
    'stats.section.top': '最大的文件',
    'stats.section.recent': '最近修改',
    'stats.types.empty': '（无文件）',
    'stats.list.empty': '无数据',
    'stats.meta.scanning': '统计中…',
    'stats.meta.failed': '统计失败：{0}',
    'stats.meta.when': '{0} · 扫描 {1} 项',
    'stats.stale': '统计已过时 · 正在重算…',
    'stats.truncated': '⚠️ 统计已截断（文件数或时间上限）；数字为部分结果',
    'stats.inline.used': '占用',
    'stats.inline.files': '文件',
    'stats.inline.recent': '/ 7d',

    // Top N by type 弹窗
    'topByType.title': '{0} · 最大的文件',
    'topByType.showTop': '显示最大的 {0} 个',
    'topByType.loading': '加载中…（{0} Top {1}）',
    'topByType.streaming': '扫描中… {0} 匹配 · 已扫 {1} 项',
    'topByType.summary': '共 {0} 个 {1} 文件，显示最大的 {2}',
    'topByType.truncated': '扫描已截断',
    'topByType.scanned': '扫描 {0} 项',
    'topByType.none': '此类型下没有文件',
    'topByType.loadFailed': '加载失败：{0}',

    // 右键菜单 / 操作
    'menu.preview': '预览',
    'menu.download': '下载',
    'menu.rename': '改名',
    'menu.delete': '删除',
    'menu.more': '更多操作',
    'menu.actionsOf': '{0} 的操作菜单',

    // 对话框
    'dialog.confirm.ok': '确定',
    'dialog.confirm.cancel': '取消',
    'dialog.confirm.deleteTitle': '删除确认',
    'dialog.confirm.deleteOne': '确认将「{0}」移到回收站？',
    'dialog.confirm.deleteMany': '确认将选中的 {0} 项移到回收站？',
    'dialog.confirm.deleteBtn': '确定删除',
    'dialog.mkdir.title': '新建文件夹',
    'dialog.mkdir.label': '输入文件夹名',
    'dialog.rename.title': '改名',
    'dialog.rename.label': '新名称',

    // 通用反馈
    'toast.created': '已创建',
    'toast.renamed': '已改名',
    'toast.deletedMany': '已删除 {0} 项',
    'toast.deletedManyPartial': '已删除 {0} 项，失败 {1} 项',
    'toast.trashedOne': '已移到回收站：{0}',
    'toast.trashedMany': '已移到回收站 {0} 项',
    'toast.trashedManyPartial': '已移到回收站 {0} 项，失败 {1}',
    'toast.restoredOne': '已恢复',
    'toast.restoredMany': '已恢复 {0} 项',
    'toast.emptyTrashed': '已清空回收站',
    'toast.purgedOne': '已永久删除',
    'toast.nameHasSlash': '名称不能包含 /',
    'toast.undoLabel': '撤销',
    'toast.previewFailed': '预览失败：{0}',
    'toast.uploadFailed': '{0}: {1}',
    'toast.downloadBigWarn': '{0} 较大，走浏览器直接下载',

    // 面包屑
    'breadcrumb.home': '{0}',  // 会填用户名

    // 搜索 banner
    'searchBanner.searching': '搜索中… <strong>{0}</strong>',
    'searchBanner.found': '搜索 <strong>{0}</strong> · 找到 {1} 项{2}',
    'searchBanner.truncatedSuffix': '（已截断）',
    'searchBanner.truncatedNote': '超过 300 项或 5s 已截断，请缩小关键词',
    'searchBanner.failed': '搜索失败：{0}',
    'searchBanner.exit': '退出搜索',

    // 预览
    'preview.close': '关闭',
    'preview.download': '下载',
    'preview.loading': '加载中…',
    'preview.text.wrap': '自动换行',
    'preview.text.lineNo': '行号',
    'preview.text.gunzip.truncated': 'gzip 自动解压 · 前 {0}{1}',
    'preview.text.gunzip.full': 'gzip 自动解压{0} · 压缩大小 {1}',
    'preview.text.truncated': '截取前 {0} / 共 {1}',
    'preview.image.hint': 'Ctrl+滚轮 / 两指捏合 缩放 · 拖拽平移 · 双击切换 · 键盘 + − 0 1',
    'preview.image.zoomOut': '缩小 (-)',
    'preview.image.zoomIn': '放大 (+)',
    'preview.image.fit': '适配 (0)',
    'preview.image.actual': '原始大小 (1)',
    'preview.image.fitLabel': '适配',
    'preview.pdf.hint': 'Ctrl+滚轮 / 两指捏合 缩放 · Ctrl+= Ctrl+− Ctrl+0 快捷键（需先点入 PDF）',
    'preview.unsupported.title': '不支持在浏览器内预览',
    'preview.unsupported.meta': '类型: {0}',
    'preview.unsupported.metaSize': '类型: {0} · 大小: {1}',

    // 传输面板
    'transfer.title': '传输',
    'transfer.close': '关闭传输面板',
    'transfer.cancel': '取消',
    'transfer.cancelOf': '取消传输 {0}',
    'transfer.waiting': '等待…',
    'transfer.stat': '{0}  ·  剩 {1}',
    'transfer.done': '完成  ·  {0} 平均',
    'transfer.err': '失败',
    'transfer.cancelled': '已取消',
    'transfer.networkErr': '网络错误',

    // 回收站
    'trash.title': '回收站',
    'trash.retention': '保留 {0} 天后自动永久删除',
    'trash.summary': '共 {0} 项',
    'trash.empty': '回收站为空',
    'trash.emptyBtn': '清空回收站',
    'trash.emptyConfirm.title': '清空回收站',
    'trash.emptyConfirm.msg': '确认清空整个回收站？其中的文件将永久删除，无法恢复。',
    'trash.restore': '恢复',
    'trash.restoreOf': '恢复 {0}',
    'trash.purge': '永久删除',
    'trash.purgeOf': '永久删除 {0}',
    'trash.purgeConfirm.title': '永久删除',
    'trash.purgeConfirm.msg': '「{0}」将被永久删除，不可恢复。',
    'trash.isDir': '文件夹',
    'trash.restoreFailed': '「{0}」。输入新路径（相对家目录）：',
    'trash.restoredOne': '已恢复：{0}',
    'trash.remain.imminent': '即将删除',
    'trash.remain.minutes': '剩 {0}m',
    'trash.remain.hours': '剩 {0}h',
    'trash.remain.days': '剩 {0}d{1}h',
    'trash.willDeleteAt': '将在 {0} 永久删除',

    // 相对时间
    'time.justNow': '刚刚',
    'time.minutesAgo': '{0} 分钟前',
    'time.hoursAgo': '{0} 小时前',
    'time.daysAgo': '{0} 天前',

    // 文件类型标签
    'type.image': '图片',
    'type.video': '视频',
    'type.audio': '音频',
    'type.pdf': 'PDF',
    'type.archive': '压缩包',
    'type.code': '代码',
    'type.document': '文档',
    'type.text': '文本',
    'type.sequencing': '测序',
    'type.variants': '变异',
    'type.reference': '参考',
    'type.matrix': '矩阵',
    'type.rdata': 'R 数据',
    'type.notebook': 'Notebook',
    'type.container': '容器镜像',
    'type.other': '其它',
    'type.dirs': '文件夹',
  },
  en: {
    'app.title': 'Filemgr',
    'app.brand': 'Filemgr',
    'login.showPassword': 'Show password',
    'login.hidePassword': 'Hide password',
    'toolbar.uploadFolder': 'Upload folder',
    'toolbar.newFile': 'New text file',
    'toolbar.downloadBatch': 'Download as archive',
    'menu.editText': 'Edit',
    'menu.saveText': 'Save',
    'dialog.newFile.title': 'New text file',
    'dialog.newFile.label': 'File name',
    'toast.savedText': 'Saved',
    'toast.moved': 'Moved',
    'dialog.confirm.deleteOneSized': 'Move "{0}" ({1}) to the recycle bin?',
    'dialog.confirm.deleteManySized': 'Move {0} selected items (~{1}{2}) to the recycle bin?',
    'dialog.confirm.unknownDirs': ', including {0} folder(s) of unknown size',
    'trash.summaryWithSize': '{0} items · {1}',
    'search.scopeHere': 'Search current folder',
    'search.scopeHome': 'Search entire home',
    'search.scopeHint': 'Searching in {0}',
    'login.subtitle': 'Sign in with your system account',
    'login.username': 'Username',
    'login.password': 'Password',
    'login.submit': 'Sign in',
    'login.hint': 'Only whitelisted system accounts may sign in.',
    'login.error.bad': 'Incorrect username or password',
    'login.error.generic': 'Sign-in failed',

    'topbar.trash': 'Open recycle bin',
    'topbar.theme.toDark': 'Switch to dark theme',
    'topbar.theme.toLight': 'Switch to light theme',
    'topbar.hidden.show': 'Show hidden files',
    'topbar.hidden.hide': 'Hide hidden files (dotfiles)',
    'topbar.checks.show': 'Show checkboxes',
    'topbar.checks.hide': 'Hide checkboxes',
    'topbar.lang.switch': 'Switch language',
    'topbar.refresh': 'Refresh current directory',
    'topbar.refresh.title': 'Refresh (R)',
    'topbar.logout': 'Log out',
    'topbar.logout.title': 'Sign out',

    'toolbar.upload': 'Upload',
    'toolbar.mkdir': 'New folder',
    'toolbar.search.placeholder': 'Search file names (Enter to search recursively in this folder)',
    'toolbar.search.clear': 'Clear search',
    'toolbar.bulkDelete': 'Delete',
    'toolbar.download': 'Download',
    'toolbar.rename': 'Rename',
    'toolbar.selection': '{0} selected',

    'col.name': 'Name',
    'col.size': 'Size',
    'col.mtime': 'Modified',
    'col.actions': 'Actions',
    'col.checkAll': 'Select all',
    'sort.byName': 'Sort by name',
    'sort.bySize': 'Sort by size',
    'sort.byMtime': 'Sort by modified time',

    'list.loading': 'Loading…',
    'list.empty': 'This folder is empty',
    'list.loadFailed': 'Load failed: {0}',
    'list.searchLocalEmpty': 'No matches in this folder. Press Enter to search recursively.',
    'list.searchGlobalEmpty': 'No file matches "{0}"',
    'list.searchingDots': 'Searching…',

    'drop.hint': 'Drop to upload into this folder',

    'status.summary': '{0} folders, {1} files',
    'status.root': 'Root: {0}',

    'stats.title': 'Home directory overview',
    'stats.toggleTitle': 'Click to collapse/expand',
    'stats.refresh': 'Recompute statistics',
    'stats.refreshTitle': 'Recompute',
    'stats.label.total': 'Used',
    'stats.label.files': 'Files',
    'stats.label.dirs': 'Folders',
    'stats.label.recent': 'Modified in {0}d',
    'stats.section.types': 'By type',
    'stats.section.top': 'Largest files',
    'stats.section.recent': 'Recently modified',
    'stats.types.empty': '(no files)',
    'stats.list.empty': 'no data',
    'stats.meta.scanning': 'Scanning…',
    'stats.meta.failed': 'Stats failed: {0}',
    'stats.meta.when': '{0} · scanned {1} items',
    'stats.stale': 'Stats out of date · recomputing…',
    'stats.truncated': '⚠️ Stats truncated (file-count or time limit); numbers are partial',
    'stats.inline.used': 'used',
    'stats.inline.files': 'files',
    'stats.inline.recent': '/ 7d',

    'topByType.title': '{0} · largest files',
    'topByType.showTop': 'Show top {0}',
    'topByType.loading': 'Loading… ({0} Top {1})',
    'topByType.streaming': 'Scanning… {0} matches · {1} items scanned',
    'topByType.summary': '{0} {1} files total, showing top {2}',
    'topByType.truncated': 'scan truncated',
    'topByType.scanned': 'scanned {0} items',
    'topByType.none': 'No files of this type',
    'topByType.loadFailed': 'Load failed: {0}',

    'menu.preview': 'Preview',
    'menu.download': 'Download',
    'menu.rename': 'Rename',
    'menu.delete': 'Delete',
    'menu.more': 'More actions',
    'menu.actionsOf': 'Actions for {0}',

    'dialog.confirm.ok': 'OK',
    'dialog.confirm.cancel': 'Cancel',
    'dialog.confirm.deleteTitle': 'Confirm delete',
    'dialog.confirm.deleteOne': 'Move "{0}" to the recycle bin?',
    'dialog.confirm.deleteMany': 'Move {0} selected items to the recycle bin?',
    'dialog.confirm.deleteBtn': 'Delete',
    'dialog.mkdir.title': 'New folder',
    'dialog.mkdir.label': 'Folder name',
    'dialog.rename.title': 'Rename',
    'dialog.rename.label': 'New name',

    'toast.created': 'Created',
    'toast.renamed': 'Renamed',
    'toast.deletedMany': 'Deleted {0} items',
    'toast.deletedManyPartial': 'Deleted {0} items, {1} failed',
    'toast.trashedOne': 'Moved to recycle bin: {0}',
    'toast.trashedMany': 'Moved {0} items to the recycle bin',
    'toast.trashedManyPartial': 'Moved {0} items, {1} failed',
    'toast.restoredOne': 'Restored',
    'toast.restoredMany': 'Restored {0} items',
    'toast.emptyTrashed': 'Recycle bin emptied',
    'toast.purgedOne': 'Permanently deleted',
    'toast.nameHasSlash': 'Name cannot contain /',
    'toast.undoLabel': 'Undo',
    'toast.previewFailed': 'Preview failed: {0}',
    'toast.uploadFailed': '{0}: {1}',
    'toast.downloadBigWarn': '{0} is large; using the browser\'s native download',

    'breadcrumb.home': '{0}',

    'searchBanner.searching': 'Searching… <strong>{0}</strong>',
    'searchBanner.found': 'Search <strong>{0}</strong> · {1} match(es){2}',
    'searchBanner.truncatedSuffix': ' (truncated)',
    'searchBanner.truncatedNote': 'Truncated at 300 matches or 5s — narrow the query',
    'searchBanner.failed': 'Search failed: {0}',
    'searchBanner.exit': 'Exit search',

    'preview.close': 'Close',
    'preview.download': 'Download',
    'preview.loading': 'Loading…',
    'preview.text.wrap': 'Word wrap',
    'preview.text.lineNo': 'Line numbers',
    'preview.text.gunzip.truncated': 'Auto-gunzipped · first {0}{1}',
    'preview.text.gunzip.full': 'Auto-gunzipped{0} · compressed size {1}',
    'preview.text.truncated': 'Showing first {0} of {1}',
    'preview.image.hint': 'Ctrl+wheel / pinch to zoom · drag to pan · double-click to toggle · keyboard + − 0 1',
    'preview.image.zoomOut': 'Zoom out (-)',
    'preview.image.zoomIn': 'Zoom in (+)',
    'preview.image.fit': 'Fit (0)',
    'preview.image.actual': 'Actual size (1)',
    'preview.image.fitLabel': 'Fit',
    'preview.pdf.hint': 'Ctrl+wheel / pinch to zoom · Ctrl+= Ctrl+− Ctrl+0 (focus the PDF first)',
    'preview.unsupported.title': 'Preview not supported in browser',
    'preview.unsupported.meta': 'Type: {0}',
    'preview.unsupported.metaSize': 'Type: {0} · Size: {1}',

    'transfer.title': 'Transfers',
    'transfer.close': 'Close transfer panel',
    'transfer.cancel': 'Cancel',
    'transfer.cancelOf': 'Cancel transfer of {0}',
    'transfer.waiting': 'Waiting…',
    'transfer.stat': '{0}  ·  {1} left',
    'transfer.done': 'Done  ·  {0} avg',
    'transfer.err': 'Failed',
    'transfer.cancelled': 'Cancelled',
    'transfer.networkErr': 'Network error',

    'trash.title': 'Recycle bin',
    'trash.retention': 'Items older than {0} days are permanently deleted',
    'trash.summary': '{0} items',
    'trash.empty': 'Recycle bin is empty',
    'trash.emptyBtn': 'Empty recycle bin',
    'trash.emptyConfirm.title': 'Empty recycle bin',
    'trash.emptyConfirm.msg': 'Empty the entire recycle bin? Items will be permanently deleted.',
    'trash.restore': 'Restore',
    'trash.restoreOf': 'Restore {0}',
    'trash.purge': 'Delete permanently',
    'trash.purgeOf': 'Permanently delete {0}',
    'trash.purgeConfirm.title': 'Delete permanently',
    'trash.purgeConfirm.msg': '"{0}" will be permanently deleted and cannot be recovered.',
    'trash.isDir': 'folder',
    'trash.restoreFailed': '"{0}". Enter a new path (relative to home):',
    'trash.restoredOne': 'Restored: {0}',
    'trash.remain.imminent': 'about to delete',
    'trash.remain.minutes': '{0}m left',
    'trash.remain.hours': '{0}h left',
    'trash.remain.days': '{0}d{1}h left',
    'trash.willDeleteAt': 'Will be permanently deleted at {0}',

    'time.justNow': 'just now',
    'time.minutesAgo': '{0}m ago',
    'time.hoursAgo': '{0}h ago',
    'time.daysAgo': '{0}d ago',

    'type.image': 'Image',
    'type.video': 'Video',
    'type.audio': 'Audio',
    'type.pdf': 'PDF',
    'type.archive': 'Archive',
    'type.code': 'Code',
    'type.document': 'Document',
    'type.text': 'Text',
    'type.sequencing': 'Sequencing',
    'type.variants': 'Variants',
    'type.reference': 'Reference',
    'type.matrix': 'Matrix',
    'type.rdata': 'R data',
    'type.notebook': 'Notebook',
    'type.container': 'Container',
    'type.other': 'Other',
    'type.dirs': 'folder',
  },
  fr: {
    'app.title': 'Filemgr',
    'app.brand': 'Filemgr',
    'login.showPassword': 'Afficher le mot de passe',
    'login.hidePassword': 'Masquer le mot de passe',
    'toolbar.uploadFolder': 'Importer un dossier',
    'toolbar.newFile': 'Nouveau fichier texte',
    'toolbar.downloadBatch': 'Télécharger en archive',
    'menu.editText': 'Modifier',
    'menu.saveText': 'Enregistrer',
    'dialog.newFile.title': 'Nouveau fichier texte',
    'dialog.newFile.label': 'Nom du fichier',
    'toast.savedText': 'Enregistré',
    'toast.moved': 'Déplacé',
    'dialog.confirm.deleteOneSized': 'Déplacer « {0} » ({1}) vers la corbeille ?',
    'dialog.confirm.deleteManySized': 'Déplacer {0} éléments sélectionnés (~{1}{2}) vers la corbeille ?',
    'dialog.confirm.unknownDirs': ', dont {0} dossier(s) de taille inconnue',
    'trash.summaryWithSize': '{0} éléments · {1}',
    'search.scopeHere': 'Rechercher dans le dossier actuel',
    'search.scopeHome': 'Rechercher tout le dossier personnel',
    'search.scopeHint': 'Recherche dans {0}',
    'login.subtitle': 'Connectez-vous avec votre compte système',
    'login.username': 'Nom d\'utilisateur',
    'login.password': 'Mot de passe',
    'login.submit': 'Se connecter',
    'login.hint': 'Seuls les comptes système autorisés peuvent se connecter.',
    'login.error.bad': 'Nom d\'utilisateur ou mot de passe incorrect',
    'login.error.generic': 'Échec de la connexion',

    'topbar.trash': 'Ouvrir la corbeille',
    'topbar.theme.toDark': 'Passer au thème sombre',
    'topbar.theme.toLight': 'Passer au thème clair',
    'topbar.hidden.show': 'Afficher les fichiers cachés',
    'topbar.hidden.hide': 'Masquer les fichiers cachés (fichiers en .)',
    'topbar.checks.show': 'Afficher les cases à cocher',
    'topbar.checks.hide': 'Masquer les cases à cocher',
    'topbar.lang.switch': 'Changer de langue',
    'topbar.refresh': 'Actualiser le dossier actuel',
    'topbar.refresh.title': 'Actualiser (R)',
    'topbar.logout': 'Se déconnecter',
    'topbar.logout.title': 'Se déconnecter',

    'toolbar.upload': 'Importer',
    'toolbar.mkdir': 'Nouveau dossier',
    'toolbar.search.placeholder': 'Rechercher des fichiers (Entrée = recherche récursive)',
    'toolbar.search.clear': 'Effacer la recherche',
    'toolbar.bulkDelete': 'Supprimer',
    'toolbar.download': 'Télécharger',
    'toolbar.rename': 'Renommer',
    'toolbar.selection': '{0} sélectionné(s)',

    'col.name': 'Nom',
    'col.size': 'Taille',
    'col.mtime': 'Modifié',
    'col.actions': 'Actions',
    'col.checkAll': 'Tout sélectionner',
    'sort.byName': 'Trier par nom',
    'sort.bySize': 'Trier par taille',
    'sort.byMtime': 'Trier par date de modification',

    'list.loading': 'Chargement…',
    'list.empty': 'Ce dossier est vide',
    'list.loadFailed': 'Échec du chargement : {0}',
    'list.searchLocalEmpty': 'Aucun résultat dans ce dossier. Appuyez sur Entrée pour une recherche récursive.',
    'list.searchGlobalEmpty': 'Aucun fichier ne correspond à « {0} »',
    'list.searchingDots': 'Recherche en cours…',

    'drop.hint': 'Déposez pour importer dans ce dossier',

    'status.summary': '{0} dossiers, {1} fichiers',
    'status.root': 'Racine : {0}',

    'stats.title': 'Aperçu du dossier personnel',
    'stats.toggleTitle': 'Cliquer pour replier/déplier',
    'stats.refresh': 'Recalculer les statistiques',
    'stats.refreshTitle': 'Recalculer',
    'stats.label.total': 'Utilisé',
    'stats.label.files': 'Fichiers',
    'stats.label.dirs': 'Dossiers',
    'stats.label.recent': 'Modifié en {0} j',
    'stats.section.types': 'Par type',
    'stats.section.top': 'Plus gros fichiers',
    'stats.section.recent': 'Récemment modifié',
    'stats.types.empty': '(aucun fichier)',
    'stats.list.empty': 'aucune donnée',
    'stats.meta.scanning': 'Analyse en cours…',
    'stats.meta.failed': 'Statistiques échouées : {0}',
    'stats.meta.when': '{0} · {1} éléments analysés',
    'stats.stale': 'Statistiques obsolètes · recalcul…',
    'stats.truncated': '⚠️ Statistiques tronquées (limite de fichiers ou de temps) ; résultats partiels',
    'stats.inline.used': 'utilisé',
    'stats.inline.files': 'fichiers',
    'stats.inline.recent': '/ 7 j',

    'topByType.title': '{0} · plus gros fichiers',
    'topByType.showTop': 'Afficher les {0} plus gros',
    'topByType.loading': 'Chargement… ({0} Top {1})',
    'topByType.streaming': 'Analyse… {0} correspondances · {1} éléments analysés',
    'topByType.summary': '{0} fichiers {1} au total, affichage des {2} plus gros',
    'topByType.truncated': 'analyse tronquée',
    'topByType.scanned': '{0} éléments analysés',
    'topByType.none': 'Aucun fichier de ce type',
    'topByType.loadFailed': 'Échec du chargement : {0}',

    'menu.preview': 'Aperçu',
    'menu.download': 'Télécharger',
    'menu.rename': 'Renommer',
    'menu.delete': 'Supprimer',
    'menu.more': 'Plus d\'actions',
    'menu.actionsOf': 'Actions pour {0}',

    'dialog.confirm.ok': 'OK',
    'dialog.confirm.cancel': 'Annuler',
    'dialog.confirm.deleteTitle': 'Confirmer la suppression',
    'dialog.confirm.deleteOne': 'Déplacer « {0} » vers la corbeille ?',
    'dialog.confirm.deleteMany': 'Déplacer {0} éléments sélectionnés vers la corbeille ?',
    'dialog.confirm.deleteBtn': 'Supprimer',
    'dialog.mkdir.title': 'Nouveau dossier',
    'dialog.mkdir.label': 'Nom du dossier',
    'dialog.rename.title': 'Renommer',
    'dialog.rename.label': 'Nouveau nom',

    'toast.created': 'Créé',
    'toast.renamed': 'Renommé',
    'toast.deletedMany': '{0} éléments supprimés',
    'toast.deletedManyPartial': '{0} éléments supprimés, {1} échec(s)',
    'toast.trashedOne': 'Déplacé vers la corbeille : {0}',
    'toast.trashedMany': '{0} éléments déplacés vers la corbeille',
    'toast.trashedManyPartial': '{0} éléments déplacés, {1} échec(s)',
    'toast.restoredOne': 'Restauré',
    'toast.restoredMany': '{0} éléments restaurés',
    'toast.emptyTrashed': 'Corbeille vidée',
    'toast.purgedOne': 'Supprimé définitivement',
    'toast.nameHasSlash': 'Le nom ne peut pas contenir /',
    'toast.undoLabel': 'Annuler',
    'toast.previewFailed': 'Aperçu échoué : {0}',
    'toast.uploadFailed': '{0} : {1}',
    'toast.downloadBigWarn': '{0} est volumineux ; téléchargement direct via le navigateur',

    'breadcrumb.home': '{0}',

    'searchBanner.searching': 'Recherche… <strong>{0}</strong>',
    'searchBanner.found': 'Recherche <strong>{0}</strong> · {1} résultat(s){2}',
    'searchBanner.truncatedSuffix': ' (tronqué)',
    'searchBanner.truncatedNote': 'Tronqué à 300 résultats ou 5 s — affinez la recherche',
    'searchBanner.failed': 'Recherche échouée : {0}',
    'searchBanner.exit': 'Quitter la recherche',

    'preview.close': 'Fermer',
    'preview.download': 'Télécharger',
    'preview.loading': 'Chargement…',
    'preview.text.wrap': 'Retour à la ligne',
    'preview.text.lineNo': 'Numéros de ligne',
    'preview.text.gunzip.truncated': 'Décompressé automatiquement · premiers {0}{1}',
    'preview.text.gunzip.full': 'Décompressé automatiquement{0} · taille compressée {1}',
    'preview.text.truncated': 'Affichage des {0} premiers sur {1}',
    'preview.image.hint': 'Ctrl+molette / pincer pour zoomer · glisser pour déplacer · double-clic pour basculer · clavier + − 0 1',
    'preview.image.zoomOut': 'Zoom arrière (-)',
    'preview.image.zoomIn': 'Zoom avant (+)',
    'preview.image.fit': 'Ajuster (0)',
    'preview.image.actual': 'Taille réelle (1)',
    'preview.image.fitLabel': 'Ajuster',
    'preview.pdf.hint': 'Ctrl+molette / pincer pour zoomer · Ctrl+= Ctrl+− Ctrl+0 (cliquez d\'abord sur le PDF)',
    'preview.unsupported.title': 'Aperçu non pris en charge par le navigateur',
    'preview.unsupported.meta': 'Type : {0}',
    'preview.unsupported.metaSize': 'Type : {0} · Taille : {1}',

    'transfer.title': 'Transferts',
    'transfer.close': 'Fermer le panneau des transferts',
    'transfer.cancel': 'Annuler',
    'transfer.cancelOf': 'Annuler le transfert de {0}',
    'transfer.waiting': 'En attente…',
    'transfer.stat': '{0} · {1} restant',
    'transfer.done': 'Terminé · {0} en moyenne',
    'transfer.err': 'Échec',
    'transfer.cancelled': 'Annulé',
    'transfer.networkErr': 'Erreur réseau',

    'trash.title': 'Corbeille',
    'trash.retention': 'Les éléments de plus de {0} jours sont supprimés définitivement',
    'trash.summary': '{0} éléments',
    'trash.empty': 'La corbeille est vide',
    'trash.emptyBtn': 'Vider la corbeille',
    'trash.emptyConfirm.title': 'Vider la corbeille',
    'trash.emptyConfirm.msg': 'Vider toute la corbeille ? Les éléments seront supprimés définitivement.',
    'trash.restore': 'Restaurer',
    'trash.restoreOf': 'Restaurer {0}',
    'trash.purge': 'Supprimer définitivement',
    'trash.purgeOf': 'Supprimer définitivement {0}',
    'trash.purgeConfirm.title': 'Supprimer définitivement',
    'trash.purgeConfirm.msg': '« {0} » sera supprimé définitivement et ne pourra pas être récupéré.',
    'trash.isDir': 'dossier',
    'trash.restoreFailed': '« {0} ». Saisissez un nouveau chemin (relatif au dossier personnel) :',
    'trash.restoredOne': 'Restauré : {0}',
    'trash.remain.imminent': 'suppression imminente',
    'trash.remain.minutes': '{0} m restantes',
    'trash.remain.hours': '{0} h restantes',
    'trash.remain.days': '{0} j {1} h restants',
    'trash.willDeleteAt': 'Seront supprimés définitivement le {0}',

    'time.justNow': 'à l\'instant',
    'time.minutesAgo': 'il y a {0} min',
    'time.hoursAgo': 'il y a {0} h',
    'time.daysAgo': 'il y a {0} j',

    'type.image': 'Image',
    'type.video': 'Vidéo',
    'type.audio': 'Audio',
    'type.pdf': 'PDF',
    'type.archive': 'Archive',
    'type.code': 'Code',
    'type.document': 'Document',
    'type.text': 'Texte',
    'type.sequencing': 'Séquençage',
    'type.variants': 'Variants',
    'type.reference': 'Référence',
    'type.matrix': 'Matrice',
    'type.rdata': 'Données R',
    'type.notebook': 'Notebook',
    'type.container': 'Conteneur',
    'type.other': 'Autre',
    'type.dirs': 'dossier',
  },
};

const LANG_KEY = 'fmgr.lang';
const SUPPORTED_LANGS = ['en', 'zh', 'fr'];
const VALID_LANG_RE = /^(en|zh|fr)$/;
let currentLang = 'zh';

function _htmlLang(lang) {
  return lang === 'zh' ? 'zh-CN' : lang === 'fr' ? 'fr' : 'en';
}

// 默认语言：优先取服务端注入的 config（配置里可设 zh / en / fr），否则退回 zh。
function _defaultLang() {
  const cfg = (typeof window !== 'undefined' && window.FMGR_CONFIG)
    ? window.FMGR_CONFIG.default_lang : null;
  return (VALID_LANG_RE.test(cfg || '')) ? cfg : 'zh';
}

function _detectLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (VALID_LANG_RE.test(saved || '')) return saved;
  } catch {}
  const def = _defaultLang();
  if (VALID_LANG_RE.test(def || '')) return def;
  const nav = (navigator.language || '').toLowerCase();
  if (nav.startsWith('zh')) return 'zh';
  if (nav.startsWith('fr')) return 'fr';
  if (nav.startsWith('en')) return 'en';
  return 'zh';
}

function t(key, ...args) {
  const dict = I18N[currentLang] || I18N.zh;
  let s = dict[key];
  if (s === undefined) s = (I18N.zh[key] !== undefined ? I18N.zh[key] : key);
  if (args.length) s = s.replace(/\{(\d+)\}/g, (_, i) => String(args[+i] ?? ''));
  return s;
}

function setLang(lang) {
  if (!VALID_LANG_RE.test(lang || '')) return;
  currentLang = lang;
  document.documentElement.lang = _htmlLang(lang);
  try { localStorage.setItem(LANG_KEY, lang); } catch {}
  applyStaticTranslations();
  // 通知动态 UI 重新渲染（见 app.js 的监听）
  window.dispatchEvent(new CustomEvent('fmgr:lang-change', { detail: { lang } }));
}

function applyStaticTranslations() {
  document.title = t('app.title');
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    el.setAttribute('title', t(el.dataset.i18nTitle));
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    el.setAttribute('aria-label', t(el.dataset.i18nAria));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder));
  });
}

function getLang() { return currentLang; }

// 初始化：读偏好后立刻应用（app.js 加载时 DOM 已经存在）
currentLang = _detectLang();
document.documentElement.lang = _htmlLang(currentLang);

// 暴露到全局
window.I18N = I18N;
window.t = t;
window.setLang = setLang;
window.getLang = getLang;
window.applyStaticTranslations = applyStaticTranslations;
