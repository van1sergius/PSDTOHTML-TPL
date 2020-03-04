"use strict";

const {src, dest} = require("gulp");
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const cssbeautify = require("gulp-cssbeautify");
const removeComments = require('gulp-strip-css-comments');
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const cleancss = require("gulp-clean-css");
const rigger = require("gulp-rigger");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const imagemin = require("gulp-imagemin");
const fontmin = require("gulp-fontmin-woff2");
const del = require("del");
const panini = require("panini");
const browsersync = require("browser-sync").create();


/* Paths */
var path = {
    build: {
        html: "app/dist/",
        js: "app/dist/assets/js/",
        css: "app/dist/assets/css/",
        images: "app/dist/assets/img/",
        fonts: "app/dist/assets/fonts/"
        
    },
    src: {
        html: "app/src/*.html",
        js: "app/src/assets/js/*.js",
        css: "app/src/assets/sass/style.sass",
        images: "app/src/assets/img/**/*.{jpg,png,svg,gif,ico,webmanifest,xml}",
        fonts: "app/src/assets/fonts/*.ttf"
    },
    watch: {
        html: "app/src/**/*.html",
        js: "app/src/assets/js/**/*.js",
        css: "app/src/assets/sass/**/*.sass",
        images: "app/src/assets/img/**/*.{jpg,png,svg,gif,ico,webmanifest,xml}",
        fonts: "app/src/assets/fonts/*.ttf"
    },
    clean: {
        dist: "./app/dist",
        fonts: "./app/dist/assets/fonts/*.{svg,css}"
    }
}



/* Tasks */
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "app/dist/"
        },
        port: 3000
    });
}

function html() {
    panini.refresh();
    return src(path.src.html, { base: "app/src/" })
        .pipe(plumber())
        .pipe(panini({
            root: 'app/src/',
            layouts: 'app/src/templates/layouts/',
            partials: 'app/src/templates/partials/'
        }))
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

function css() {
    return src(path.src.css, { base: "app/src/assets/sass/" })
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            Browserslist: ['last 8 versions'],
            cascade: true
        }))
        .pipe(cssbeautify())
        .pipe(dest(path.build.css))
        .pipe(cleancss())
        .pipe(removeComments())
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

function js() {
    return src(path.src.js, {base: './app/src/assets/js/'})
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min",
            extname: ".js"
        }))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

function images() {
    return src(path.src.images)
        .pipe(imagemin())
        .pipe(dest(path.build.images));
}

function fonts() {
    return src(path.src.fonts)
        .pipe(fontmin())
        .pipe(dest(path.build.fonts));
}

function cleanFonts() {
    return del(path.clean.fonts);
}

function clean() {
    return del(path.clean.dist);
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.images], images);
    gulp.watch([path.watch.fonts], fonts);
}

const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts), cleanFonts);
const watch = gulp.parallel(build, watchFiles, browserSync);



/* Exports Tasks */
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.cleanFonts = cleanFonts;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;
