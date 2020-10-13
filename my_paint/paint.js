/**
 * Fichier paint.js
 * permet de dessiner
 * 
 * 
 * 
 * @var array Données utilisées pour déssiner
 * @var object Données utiisées par le pinceau
 * @var canvas sert de liens de programmations entre mon code javascript et mon id canvas
 * @var context cette variable permet de dessiner dans ma balise (canvas)
 */
var canvas, ctx,
    brush = {
        x: 0,
        y: 0,
        color: '#000000',
        size: 10,
        down: false,
    },
    strokes = [],
    currentStroke = null;
/**
 * @param clearRect faire un rectangle pérforer
 * @param lineCap détermine la forme utilisée pour dessiner les points finaux des lignes.
 * @param strokeStyle spécifie la couleur, le dégradé ou le motif à utiliser pour les traits 
 * (lignes de bordure) autour des formes. La valeur par défaut est # 000 (noir).
 * @param lineWidth définit l'épaisseur des lignes en fonctions des coordonnées.
 * @param beginPath commence un nouveau chemin en vidant la liste des sous-chemins. 
 * Appelez cette méthode lorsque vous souhaitez créer un nouveau chemin.
 * @param moveTo commence un nouveau sous-chemin au point spécifié
 * par les coordonnées (x, y) données.
 * @param lineTo ajoute une ligne droite au sous-chemin actuel
 * en connectant le dernier point du sous-chemin aux coordonnées (x, y) spécifiées.
 * @param stroke dessine sur la toile
 */
function redraw () {

    ctx.clearRect(0, 0, canvas.width(), canvas.height());
    ctx.lineCap = 'round';
    for (var i = 0; i < strokes.length; i++) {
        var s = strokes[i];
        ctx.strokeStyle = s.color;
        ctx.lineWidth = s.size;
        ctx.beginPath();
        ctx.moveTo(s.points[0].x, s.points[0].y);
        for (var j = 0; j < s.points.length; j++) {
            var p = s.points[j];
            ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
    }
}

/**
 * @param getContext permet de passer de la 2d a la 3d
 * @param mouse permet de récupérer l'événement de la souris
 */

function init () {
    canvas = $('#paint');
    canvas.attr({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    ctx = canvas[0].getContext('2d');

    function mouseEvent (e) {
        brush.x = e.pageX;
        brush.y = e.pageY;

        currentStroke.points.push({
            x: brush.x,
            y: brush.y,
        });

        redraw();
    }

    canvas.mousedown(function (e) {
        brush.down = true;

        currentStroke = {
            color: brush.color,
            size: brush.size,
            points: [],
        };

        strokes.push(currentStroke);

        mouseEvent(e);
    }).mouseup(function (e) {
        brush.down = false;

        mouseEvent(e);

        currentStroke = null;
    }).mousemove(function (e) {
        if (brush.down)
            mouseEvent(e);
    });

/**
 * @$ selecteur permet de cibler l'id 
 * chaque selecteur revoit a une fonctions différente
 * ici: La gomme, choisir la couleur, taille du pinceau etc...
 */
    $('#undo-btn').click(function () {
        strokes.pop();
        redraw();
    });

    $('#color-picker').on('input', function () {
        brush.color = this.value;
    });

    $('#brush-size').on('input', function () {
        brush.size = this.value;
    });

    $('#clear-btn').click(function () {
        strokes = [];
        redraw();
    });

    $('#save-btn').click(function () {
        window.open(canvas[0].toDataURL());
    });
}

$(init);