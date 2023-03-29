const ObjProperty= function ShowObjProperty(Obj) {
    var attributes = '';
    var methods = '';
    for (const attr in Obj) {
        if (Obj.attr != null)
            attributes = attributes + attr + ' 属性： ' + Obj.i + '\r\n';
        else
            methods = methods + '方法: ' + attr + '\r\n';
    }
    return attributes, methods
}
module.exports = ObjProperty
