#gulp-project

// readme
// 1.更改gulp-rev文件(version:"8.1.0")
// node_modules--->gulp-rev--->index.js

// 将 manifest[originalFile] = revisionedFile;
// 改为 manifest[originalFile] = originalFile + '?v=' + file.revHash;


// 2.更改gulp-rev-collector文件(version:"1.2.3")
// node_modules--->gulp-rev-collector--->index.js

// 将 let cleanReplacement = path.basename(json[key]).replace(new RegExp( opts.revSuffix ), '' );
// 改为 let cleanReplacement =  path.basename(json[key]).split('?')[0];


// 3.更改rev-path文件(version: "2.0.0")
// node_modules--->rev-path--->index.js

// 将 return modifyFilename(pth, (filename, ext) => `${filename}-${hash}${ext}`);
// 改为 return modifyFilename(pth, (filename, ext) => `${filename}${ext}`);


// 4.更改gulp-rev-collector文件(version:"1.2.3")
// node_modulesgulp-rev-collectorindex.js

// 将  regexp: new RegExp( prefixDelim + pattern, 'g' ),
// 改为 regexp: new RegExp( prefixDelim + pattern+'(\\?v=\\w{10})?', 'g' ),
