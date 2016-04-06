class EditSection {
    section: JQuery;
    selectors: any = {};
    selectForm: JQuery;
    selectDiv: JQuery;
    editDiv: JQuery;
    editForm: JQuery;
    formOptions: any = {};
    editOptions: any = {};
    messages: any = {};
}

const home: EditSection = new EditSection();

const animationTime: number = 250;

home.messages = {
    errors: {
        mustBeSelected: 'You must select a row and a section',
        firstRowAdd: 'Can\'t add section to first row.',
        firstRowDelete:'Can\'t delete section to first row.'
    },
    success: {
        update: 'Section successfully updated.'
    }
};

class Mode {
    static operation: string;
    static page: string;
    static info: any;
}

function handleMessage(message: JQuery, mount: JQuery) {
    $('.tab-content.current').css('height', '+=' + message.outerHeight(true));
}

function handleAllMessageRemove() {
    home.section.css('height', $('.section.currentSection').outerHeight(true));
}

$(function() {
    home.section = $('#home');
    home.selectDiv = $('#homeSelection');
    home.selectForm = $('#homeSelectForm');
    home.editDiv = $('#homeEdit');
    home.editForm = $('#headerForm');
    home.formOptions.selectRow = $('#selectRow');
    home.formOptions.selectSection = $('#selectSection');
    home.editOptions.header = $('#homeHeaderOption');
    home.editOptions.color = $('#homeColorOption');


    home.editDiv.css('top', -home.selectDiv.height());
    home.section.css('height', home.selectDiv.height());
    tinymce.init(
        {
            selector: '#homeContentOption',
            plugins: 'advlist,anchor,autolink,autosave,charmap,code,codesample,colorpicker,contextmenu,directionality,emoticons,fullscreen,hr,image,imagetools,importcss,insertdatetime,layer,link,lists,media,nonbreaking,noneditable,paste,preview,print,save,searchreplace,spellchecker,tabfocus,table,template,textcolor,textpattern,visualblocks,visualchars,wordcount',
            toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        }
    );

    $('ul.tabs li').click(function(){
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $('#'+tab_id).addClass('current');
    });

    HomePage.getFormSelectors();

    //Add clicked attribute to a submit input when clicked
    $('form input[type=submit]').click(function(event) {
        $('input[type=submit]', $(this).parents('form')).removeAttr('clicked');
        $(this).attr('clicked', 'true');
        //event.preventDefault();
    });

    //Home Selector Change Rules
    home.formOptions.selectRow.change(function() {
        home.formOptions.selectSection.find('option:gt(0)').remove();
        var rowSections = home.selectors.sections[home.formOptions.selectRow.val() - 1];
        for (var i in rowSections) {
            var section = rowSections[i];
            var sectionEntry = $(document.createElement('option'));
            sectionEntry.attr('value', section.id).text('Section ' + (parseInt(i) + 1) + ' - ' + section.header);
            home.formOptions.selectSection.append(sectionEntry);
        }
    });

    //Home Selection Form Submit
    home.selectForm.submit(function(event) {
        event.preventDefault();
        MessageHandle.removeAllMessages(handleAllMessageRemove);
        let clickedButton = home.selectForm.find('input[type=submit][clicked=true]');
        if (clickedButton.attr('name') === 'edit') {
            if (home.formOptions.selectRow.val() === null || home.formOptions.selectSection.val() === null) {
                MessageHandle.messageBefore(home.selectForm, home.messages.errors.mustBeSelected, MessageHandle.MessageType.NEGATIVE, handleMessage);
                return;
            }
            HomePage.generateCustomizationDialog('edit', home.formOptions.selectSection.val());


        } else if (clickedButton.attr('name') === 'add') {
            if (home.formOptions.selectRow.val() === '1') {
                MessageHandle.messageBefore(home.selectForm, home.messages.errors.firstRowAdd, MessageHandle.MessageType.NEGATIVE, handleMessage);
                return;
            }

            HomePage.generateCustomizationDialog('add', home.formOptions.selectRow.val());


        } else if (clickedButton.attr('name') === 'delete') {
            if (home.formOptions.selectRow.val() === '1') {
                MessageHandle.messageBefore(home.selectForm, home.messages.errors.firstRowDelete, MessageHandle.MessageType.NEGATIVE, handleMessage);
                return;
            }
        }
    });

    home.editForm.submit(function(event) {
        event.preventDefault();
        let clickedButton = home.editForm.find('input[type=submit][clicked=true]');
        MessageHandle.removeAllMessages(handleAllMessageRemove);

        if (clickedButton.attr('name') === 'cancel') {
            home.section.children().removeClass('currentSection');
            home.selectForm.addClass('currentSection');
            var animWidth: number = parseFloat(home.selectDiv.css('left'));
            //home.editDiv.fadeIn(animationTime);
            home.selectDiv.delay(100).animate({left: 0, opacity: 1}, animationTime);
            home.editDiv.delay(100).animate({left: -animWidth, opacity: 0}, {
                duration: animationTime,
                complete: function() {
                    home.editOptions.header.val('');
                    home.editOptions.color.val('');
                    tinymce.activeEditor.setContent('');
                }
            });
            setTimeout(function() {
                var h = home.selectDiv.height();
                home.section.animate({height: h}, animationTime);
            }, 100);

        } else if (clickedButton.attr('name') === 'save') {
            if (Mode.operation === 'add') {
                let data = {
                    header: home.editOptions.header.val(),
                    content: tinymce.activeEditor.getContent(),
                    section: Mode.info.id,
                    color: home.editOptions.color.val()
                };
                console.log(data);
                $.ajax({
                    type: 'PUT',
                    url: '/api/admin/edit/home',
                    data: JSON.stringify(data),
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    success: function (res) {
                        console.log('Updated - ' + JSON.stringify(res));
                        MessageHandle.messageBefore(home.editForm, home.messages.success.update, MessageHandle.MessageType.POSITIVE, handleMessage);
                        HomePage.wipeFormSelectors();
                        HomePage.getFormSelectors();
                    },
                    error: function (res) {
                        console.log('Error updating records');
                        console.log(res);
                    }
                });
            } else if (Mode.operation === 'edit') {
                let data = {
                    header: home.editOptions.header.val(),
                    content: tinymce.activeEditor.getContent(),
                    color: home.editOptions.color.val()
                };
                console.log(data);
                $.ajax({
                    type: 'PATCH',
                    url: '/api/admin/edit/home/' + Mode.info.id,
                    data: JSON.stringify(data),
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    success: function (res) {
                        console.log('Updated - ' + JSON.stringify(res));
                        MessageHandle.messageBefore(home.editForm, home.messages.success.update, MessageHandle.MessageType.POSITIVE, handleMessage);
                        HomePage.wipeFormSelectors();
                        HomePage.getFormSelectors();
                    },
                    error: function (res) {
                        console.log('Error updating records');
                        console.log(res);
                    }
                });
            }
        }
    });
});

module HomePage {

    export function getFormSelectors() {
        $.ajax({
            type: 'GET',
            url: '/api/admin/edit/homeEditSelectors',
            success: function (res) {
                console.log(res);
                var optionSelector = $('option');
                home.selectors = res;
                home.formOptions.selectRow.find(optionSelector).text('Select Row');
                home.formOptions.selectSection.find(optionSelector).text('Select Section');
                for (var i in res.rows) {
                    var row = res.rows[i];
                    var rowEntry = $(document.createElement('option'));
                    rowEntry.attr('value', row).text('Row ' + row);
                    home.formOptions.selectRow.append(rowEntry);
                }
            },
            error: function (res) {
                if (res.status === 500)
                    alert('There was an internal server error while getting the home selectors');
                else
                    alert('Something went wrong while getting the home selectors');
            }
        });
    }

    export function wipeFormSelectors() {
        var optionSelector = $('option');
        home.formOptions.selectRow.children().remove('option:gt(0)');
        home.formOptions.selectSection.children().remove('option:gt(0)');
        home.formOptions.selectRow.find(optionSelector).text('Loading...');
        home.formOptions.selectSection.find(optionSelector).text('Loading...');
    }

    export function generateCustomizationDialog(operation:string, sectionId:number) {
        Mode.page = 'home';
        Mode.operation = operation;
        Mode.info = {id: sectionId};
        home.section.children().removeClass('currentSection');
        home.editDiv.addClass('currentSection');
        var animWidth:number = parseFloat(home.editDiv.css('left'));
        home.selectDiv.delay(100).animate({left: -animWidth, opacity: 0}, animationTime);
        home.editDiv.delay(100).animate({left: 0, opacity: 1}, animationTime);
        setTimeout(function () {
            var h = home.editDiv.height();
            home.section.animate({height: h}, animationTime);
        }, 100);
        if (operation === 'edit') {
            $.ajax({
                type: 'GET',
                url: '/api/admin/edit/home/' + sectionId,
                success: function (res) {
                    home.editOptions.header.val(res.header);
                    tinymce.activeEditor.setContent(res.content);
                    home.editOptions.color.val(res.color);
                },
                error: function (res) {
                    if (res.status === 500)
                        alert('There was an internal server error while getting the home selectors');
                    else
                        alert('Something went wrong while getting the home selectors');
                }
            });
        }
    }
}