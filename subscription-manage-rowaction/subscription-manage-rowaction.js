
({
    extendsFrom: 'RowactionField',

    events: {
        'click [name="subscription-manage-rowaction"]': 'handleClick'
    },

    /**
     * @inheritdoc
     */
    initialize: function (options) {
        console.log('initititititi');
        this._super('initialize', [options]);
        this.type = 'rowaction';
    },

    /**
     * @inheritdoc
     * Add ability to hide/show the erase action based on conditions
     */
    _render: function () {
        // only show erase link if all these donditions are met
        if (true) {
            this._super('_render');
        } else {
            this.hide();
        }
    },

    // bindDataChange: function () {
    //     this._super('bindDataChange', arguments);
    //     //When the parent record resaves, check if we need to show/hide
    //     this.listenTo(this.context.parent.get('model'), 'sync', this.render);
    // },

    /**
     * Trigger event to open the Mark for Erasure drawer.
     */
    handleClick: function () {
        console.log('clicked');
        var self = this;
        let randomNoCacheKey = Math.floor(Math.random() * Math.floor(200));
        let url = '/custom/include/html/subscription/subscription_manage_details.html';
        const { request, init } = this.getRequest(url);
        fetch(request, init)
            .then(function (response) {
                // When the page is loaded convert it to text
                return response.text()
            })
            .then(function (html) {
                // Initialize the DOM parser
                var parser = new DOMParser();

                // Parse the text
                // var doc = parser.parseFromString(html, "text/html");

                // You can now even select part of that html as you would in the regular DOM 
                // Example:
                // var docArticle = doc.querySelector('article').innerHTML;

                // console.log(doc);
                self.removeElementsByTagName('x-modal');
                $(html).appendTo('body');
                modal = document.querySelector("x-modal");
                modal.visible = true;

                // document.getElementById('content').appendChild(html)
            })
            .catch(function (err) {
                console.log('Failed to fetch page: ', err);
            });
    },

    getRequest(url) {

        var headers = new Headers();
        headers.append('pragma', 'no-cache');
        headers.append('cache-control', 'no-cache');

        var init = {
            method: 'GET',
            headers: headers,
        };

        var request = new Request(url);

        return {
            request: request,
            init: init,
        }
    },

    removeElementsByTagName(name) {
        var elements = document.getElementsByTagName(name);
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
})
