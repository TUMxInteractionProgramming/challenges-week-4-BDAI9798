/* #6 start the #external #action and say hello */
console.log("App is alive");
/* variable currentChannel declaration and initilization*/
var currentChannel = sevenContinents;

var currentLocation = {
    latitude: 52.415575,
    longitude: 10.690113,
    what3words: "buch.wollte.tauben"
};
/**
 * #6 #Switcher function for the #channels name in the right app bar
 * @param channelName Text which is set
 */
function switchChannel(channelName) {
    //Log the channel switch
    console.log("Tuning in to channel", channelName.name);

    //Write the new channel to the right app bar
    document.getElementById('channel-name').innerHTML = channelName.name;

    //#6 change the #channel #location
    document.getElementById('channel-location').innerHTML = 'by <a href="http://w3w.co/' + channelName.createdBy + '"target="_blank"><strong>' +
        channelName.createdBy + '</strong></a>';

    /* #6 #liking channels on #click and toggle between star and star-o*/
    $('#chat h1 i').removeClass('fa-star fa-star-o');
    $('#chat h1 i').addClass(channelName.starred ? 'fa-star' : 'fa-star-o');

    /* #6 #highlight the selected #channel.
       This is inefficient (jQuery has to search all channel list items), but we'll change it later on */
    $('#channels li').removeClass('selected');
    $('#channels li:contains(' + channelName.name + ')').addClass('selected');
    /* assign the gewählte Channel to the global varibale currentChannek*/
    currentChannel = channelName;
}




/* #6 #liking a channel on #click */
function star() {
    /* use the font awesome class to replace the image for star icon*/
    $('#chat h1 i').toggleClass("fa-star-o");
    $('#chat h1 i').toggleClass('fa-star');
    /* toggle the star status behind the apperance*/
    currentChannel.starred = !currentChannel.starred;
    /*find out where the currentChannel is in channel list and toggle the star status for apperance. */
    $('#channels li:contains(' + currentChannel.name + ') .fa').removeClass('fa-star fa-star-o');
    $('#channels li:contains(' + currentChannel.name + ') .fa').addClass(currentChannel.starred ? 'fa-star' : 'fa-star-o');
}

/**
 * #6 #taptab selects the given tab
 * @param tabId #id of the tab
 */
function selectTab(tabId) {
    // #6 #taptab #remove selection from all buttons...
    $('#tab-bar button').removeClass('selected');

    //...#6 #taptab #log the new tab on change...
    console.log('Changing to tab', tabId);

    //...#6 #taptab #add selection to the given tab button, its id is passed via the #argument tabId
    $(tabId).addClass('selected');
}

/**
 * #6 #toggle (show/hide) the emojis menu #smile
 */
function toggleEmojis() {
    /* $('#emojis').show(); // #show */
    $('#emojis').toggle(); // #toggle
}

function Message(text) {
    this.text = text;
    this.createdBy = currentLocation.what3words;
    this.longitude = currentLocation.longitude;
    this.latitude = currentLocation.latitude;
    this.createdOn = new Date();
    this.expiredON = new Date(Date.now() + 15 * 60 * 1000);
    this.own = true;
}

function sendMessage() {
    var message = new Message($('#message').val());
    //var message = new Message('Hello Chatter');
    console.log("New message:", message);

    $('#messages').append(createMessageElement(message));

    $('#messages').scrollTop($('#messages').prop('scrollHeight'));
    $('#message').val('');
}

function createMessageElement(messageObject) {
    var expireIn = Math.round((messageObject.expiredON - Date.now()) / 60000);

    var dateinstring =  messageObject.createdOn.getDate()+'.'+messageObject.createdOn.getMonth()+'.'+
    messageObject.createdOn.getFullYear()+', '+messageObject.createdOn.getHours()+
    ':'+messageObject.createdOn.getMinutes()+':'+messageObject.createdOn.getSeconds();

    return '<div class="message'+
        (messageObject.own ? ' own' : '') + '">' + '<h3><a href="http://w3w.co/' + messageObject.createdBy +
        '" target="_blank">'+ '<strong>' + messageObject.createdBy + '</strong></a>' + dateinstring
        + '<em>' + expireIn + 'min. left</em></h3><p>' + messageObject.text + '</p>' +
        '<button>+5 min.</button>' + '</div>';

}
function listChannels()
{
    $('#channels ul').append(createChannelElement(yummy));
    $('#channels ul').append(createChannelElement(sevenContinents));
    $('#channels ul').append(createChannelElement(killerApp));
    $('#channels ul').append(createChannelElement(firstPersonOnMars));
    $('#channels ul').append(createChannelElement(octoberfest));

}
function createChannelElement(channelObject){

    var channel= $("<li></li>").text(channelObject.name);
    
    var meta = $("<span class='channel-meta'> </span>").appendTo(channel);

    $('<i>').addClass('fa').addClass(channelObject.starred ? 'fa-star':'fa-star-o').appendTo(meta);

    $("<span></span>").text(channelObject.expiresIn+' min').appendTo(meta);
    $("<span></span>").text(channelObject.messageCount+' new').appendTo(meta);


    $('<i>').addClass('fa fa-chevron-right').appendTo(meta);

    return channel;



}