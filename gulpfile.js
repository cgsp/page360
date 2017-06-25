var gulp=require("gulp");
//  添加CSS前缀
var cssAutoprefixer=require("gulp-autoprefixer");
// 压缩CSS 
var cssMin=require("gulp-cssnano");
// 压缩JS
var jsMin =require("gulp-uglify");
// 合并
var concat=require("gulp-concat");
// 压缩图片
var imageMin=require('gulp-imagemin');
// 压缩HTML文件（可以压缩HTML中的JS）
var htmlMin=require("gulp-htmlmin");
// 改名字(利用文件内容生成的hash名,将文件的内容加密，生成一个字符串，截取这个字符串的一部分)
var rev=require("gulp-rev");
// 替换引用路径
var revCollector=require("gulp-rev-collector");



//添加CSS前缀
gulp.task("cssAutoprefixer",function(){
    return gulp.src("./css/*.css",{base:"./"})
        .pipe(cssAutoprefixer())
        .pipe(gulp.dest("./dist"))
});

// 压缩CSS 
gulp.task("cssMin",["cssAutoprefixer"],function(){
    return gulp.src("./dist/css/*.css",{base:"./dist"})
        .pipe(cssMin())
        .pipe(gulp.dest("./dist"))
})



// 压缩JS
gulp.task("jsMin",function(){
    return gulp.src("./js/*.js",{base:"./"})
        .pipe(jsMin())
        .pipe(gulp.dest("./dist"))
})

//压缩图片
gulp.task("imageMin",function(){
    return gulp.src("./images/*",{base:"./"})
        .pipe(imageMin())
        .pipe(gulp.dest("./dist"))
})


// 压缩HTML文件（可以压缩HTML中的JS）
gulp.task("htmlMin",function(){
    return gulp.src("./*.html")
    .pipe(htmlMin({
        collapseWhitespace: true,
        removeComments:true,
        minifyJS:true
    }))
    .pipe(gulp.dest("./dist"))
})



// gulp.task("concat",function(){
//     return gulp.src("./js/*.js",{base:"./"})
//         .pipe(concat("all.js"))
//         .pipe(gulp.dest("./dist"))
// })

gulp.task("min",["cssMin","jsMin","imageMin","htmlMin"])


// 生成hash文件名
gulp.task("rev",["min"],function(){
    // return gulp.src(["./dist/css/*.css","./dist/js/*.js","./dist/images/*","./dist/*.html"],{base:"./dist"})
    // global语法
    // return gulp.src(["./dist/**/*","!**/*.html"],{base:"./dist"})
    return gulp.src(["./dist/**/*"],{base:"./dist"})
        // 新的文件名
        .pipe(rev())
        //存到dist
        .pipe(gulp.dest("./dist"))
        // 收集原文件名与新文件名的关系
        .pipe(rev.manifest())
        // 以json的形式存入rev文件夹
        .pipe(gulp.dest("./rev"))

})

gulp.task("revCollector",["rev"],function(){
    // 根据生成的json文件去替换html里面的路径
    return gulp.src(["./rev/*.json","./dist/*.html"])
        .pipe(revCollector())
        .pipe(gulp.dest("./dist"))
})

gulp.task("default",["revCollector"])

// 调用这个命令，在git中可以写gulp default或者直接写个gulp也行
// gulp.task("default",["css","jsconcat","iamge","html"],function(){

// })





















// var gulp=require("gulp");

// //  添加CSS前缀
// var cssAutoprefixer=require("gulp-autoprefixer");
// // 压缩CSS 
// var cssMin=require("gulp-cssnano");
// // 压缩JS
// var jsMin =require("gulp-uglify");
// // 压缩图片
// var imageMin=require('gulp-imagemin');
// // 压缩HTML文件（可以压缩HTML中的JS）
// var htmlMin=require("gulp-htmlmin");

// // 合并
// var concat=require("gulp-concat");
// // 另外一个合并神器
// var useref=require("gulp-useref")


// // 改名字(利用文件内容生成的hash名,将文件的内容加密，生成一个字符串，截取这个字符串的一部分)
// var rev=require("gulp-rev");
// // 替换引用路径
// var revCollector=require("gulp-rev-collector");


// // css处理
// gulp.task("css",function(){
//     return gulp.src("./css/*.css",{base:"./"})
//         .pipe(cssAutoprefixer())
//         .pipe(cssMin())
//         .pipe(gulp.dest("./dist"))
// });

// //js处理
// gulp.task("js",function(){
//     return gulp.src("./js/*.js",{base:"./"})
//         .pipe(jsMin())
//         .pipe(gulp.dest("./dist"))
// });

// // html处理
// gulp.task("html",function(){
//     return gulp.src("./*.html")
//     .pipe(htmlMin({
//         collapseWhitespace: true,
//         removeComments:true,
//         minifyJS:true
//     }))
//     .pipe(gulp.dest("./dist"))
// })

// //image处理
// gulp.task("image",function(){
//     return gulp.src("./images/*",{base:"./"})
//         .pipe(imageMin())
//         .pipe(gulp.dest("./dist"))
// })

// gulp.task("prehandle",["css","js","image","html"])


// // 生成hash文件名
// gulp.task("rev",["prehandle"],function(){
//     // return gulp.src(["./dist/css/*.css","./dist/js/*.js","./dist/images/*","./dist/*.html"],{base:"./dist"})
//     // global语法
//     // return gulp.src(["./dist/**/*","!**/*.html"],{base:"./dist"})
//     return gulp.src(["./dist/**/*"],{base:"./dist"})
//         // 新的文件名
//         .pipe(rev())
//         //存到dist
//         .pipe(gulp.dest("./dist"))
//         // 收集原文件名与新文件名的关系
//         .pipe(rev.manifest())
//         // 以json的形式存入rev文件夹
//         .pipe(gulp.dest("./rev"))

// })

// gulp.task("revCollector",["rev"],function(){
//     // 根据生成的json文件去替换html里面的路径
//     return gulp.src(["./rev/*.json","./dist/*.html"])
//         .pipe(revCollector())
//         .pipe(gulp.dest("./dist"))
// })

// gulp.task("default",["revCollector"])


























































