import {App} from "vue";
import {
    ElButton,
    ElButtonGroup,
    ElCheckbox,
    ElCol,
    ElConfigProvider,
    ElContainer,
    ElDialog,
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    ElForm,
    ElFormItem,
    ElIcon,
    ElImage,
    ElInput,
    ElInputNumber,
    ElLink,
    ElMain,
    ElMenu,
    ElMenuItem,
    ElOption,
    ElPageHeader,
    ElPagination,
    ElProgress,
    ElRadio,
    ElRadioGroup,
    ElRow,
    ElSelect,
    ElStep,
    ElSteps,
    ElSubMenu,
    ElTable,
    ElTableColumn,
    ElTooltip,
    ElUpload
} from "element-plus";

import {
    Back,
    Brush,
    Camera,
    CaretBottom,
    Clock,
    Collection,
    Connection,
    CopyDocument,
    DataAnalysis,
    Delete,
    Document,
    DocumentAdd,
    DocumentCopy,
    DocumentDelete,
    Download,
    Edit,
    EditPen,
    Film,
    Folder,
    FolderAdd,
    FolderChecked,
    FolderDelete,
    FolderOpened,
    FullScreen,
    Handbag,
    IceCreamRound,
    Iphone,
    Key,
    Link,
    List,
    MagicStick,
    Memo,
    MessageBox,
    Minus,
    Monitor,
    MoreFilled,
    Notebook,
    Notification,
    Opportunity,
    Picture,
    PictureFilled,
    Platform,
    Plus,
    Promotion,
    Refresh,
    RefreshLeft,
    RefreshRight,
    Right,
    Scissor,
    Search,
    Sell,
    Share,
    SoldOut,
    StarFilled,
    Tickets,
    Tools,
    Upload,
    UploadFilled,
    VideoCamera,
    VideoPlay,
    Warning
} from "@element-plus/icons-vue";

export const ElementUI = {
    install(Vue: App) {
        Vue.component(<any>ElRow.name, ElRow);
        Vue.component(<any>ElCol.name, ElCol);

        Vue.component(<any>ElStep.name, ElStep);
        Vue.component(<any>ElMenu.name, ElMenu);
        Vue.component(<any>ElForm.name, ElForm);
        Vue.component(<any>ElSteps.name, ElSteps);
        Vue.component(<any>ElInput.name, ElInput);
        Vue.component(<any>ElUpload.name, ElUpload);
        Vue.component(<any>ElSubMenu.name, ElSubMenu);
        Vue.component(<any>ElFormItem.name, ElFormItem);
        Vue.component(<any>ElMenuItem.name, ElMenuItem);

        Vue.component(<any>ElButton.name, ElButton);
        Vue.component(<any>ElSelect.name, ElSelect);
        Vue.component(<any>ElOption.name, ElOption);
        Vue.component(<any>ElDialog.name, ElDialog);
        Vue.component(<any>ElCheckbox.name, ElCheckbox);
        Vue.component(<any>ElInputNumber.name, ElInputNumber);

        Vue.component(<any>ElRadio.name, ElRadio);
        Vue.component(<any>ElProgress.name, ElProgress);
        Vue.component(<any>ElRadioGroup.name, ElRadioGroup);
        Vue.component(<any>ElPagination.name, ElPagination);
        Vue.component(<any>ElPageHeader.name, ElPageHeader);
        Vue.component(<any>ElButtonGroup.name, ElButtonGroup);

        Vue.component(<any>ElMain.name, ElMain);
        Vue.component(<any>ElTooltip.name, ElTooltip);
        Vue.component(<any>ElDropdown.name, ElDropdown);
        Vue.component(<any>ElContainer.name, ElContainer);
        Vue.component(<any>ElDropdownMenu.name, ElDropdownMenu);
        Vue.component(<any>ElDropdownItem.name, ElDropdownItem);

        Vue.component(<any>ElLink.name, ElLink);
        Vue.component(<any>ElIcon.name, ElIcon);
        Vue.component(<any>ElImage.name, ElImage);
        Vue.component(<any>ElTable.name, ElTable);
        Vue.component(<any>ElTableColumn.name, ElTableColumn);
        Vue.component(<any>ElConfigProvider.name, ElConfigProvider);

        Vue.component(<any>UploadFilled.name, UploadFilled);
        Vue.component(<any>CaretBottom.name, CaretBottom);
        Vue.component(<any>Back.name, Back);
        Vue.component(<any>Right.name, Right);
        Vue.component(<any>Folder.name, Folder);
        Vue.component(<any>FolderOpened.name, FolderOpened);
        Vue.component(<any>FolderChecked.name, FolderChecked);
        Vue.component(<any>Search.name, Search);
        Vue.component(<any>StarFilled.name, StarFilled);
        Vue.component(<any>Tools.name, Tools);
        Vue.component(<any>CopyDocument.name, CopyDocument);
        Vue.component(<any>DocumentAdd.name, DocumentAdd);
        Vue.component(<any>FolderAdd.name, FolderAdd);
        Vue.component(<any>Upload.name, Upload);
        Vue.component(<any>Link.name, Link);
        Vue.component(<any>Download.name, Download);
        Vue.component(<any>Sell.name, Sell);
        Vue.component(<any>Delete.name, Delete);
        Vue.component(<any>DocumentCopy.name, DocumentCopy);
        Vue.component(<any>Scissor.name, Scissor);
        Vue.component(<any>List.name, List);
        Vue.component(<any>RefreshRight.name, RefreshRight);
        Vue.component(<any>Refresh.name, Refresh);
        Vue.component(<any>Clock.name, Clock);
        Vue.component(<any>DataAnalysis.name, DataAnalysis);
        Vue.component(<any>Connection.name, Connection);
        Vue.component(<any>RefreshLeft.name, RefreshLeft);
        Vue.component(<any>Warning.name, Warning);
        Vue.component(<any>MessageBox.name, MessageBox);
        Vue.component(<any>EditPen.name, EditPen);
        Vue.component(<any>PictureFilled.name, PictureFilled);
        Vue.component(<any>SoldOut.name, SoldOut);
        Vue.component(<any>Document.name, Document);
        Vue.component(<any>VideoPlay.name, VideoPlay);
        Vue.component(<any>FolderDelete.name, FolderDelete);
        Vue.component(<any>DocumentDelete.name, DocumentDelete);
        Vue.component(<any>VideoCamera.name, VideoCamera);
        Vue.component(<any>Picture.name, Picture);
        Vue.component(<any>Handbag.name, Handbag);
        Vue.component(<any>Memo.name, Memo);
        Vue.component(<any>Tickets.name, Tickets);
        Vue.component(<any>Brush.name, Brush);
        Vue.component(<any>MagicStick.name, MagicStick);
        Vue.component(<any>Key.name, Key);
        Vue.component(<any>Plus.name, Plus);
        Vue.component(<any>Minus.name, Minus);
        Vue.component(<any>Share.name, Share);
        Vue.component(<any>Edit.name, Edit);
        Vue.component(<any>IceCreamRound.name, IceCreamRound);
        Vue.component(<any>Platform.name, Platform);
        Vue.component(<any>Notification.name, Notification);
        Vue.component(<any>MoreFilled.name, MoreFilled);
        Vue.component(<any>Notebook.name, Notebook);
        Vue.component(<any>Collection.name, Collection);
        Vue.component(<any>FullScreen.name, FullScreen);
        Vue.component(<any>Monitor.name, Monitor);
        Vue.component(<any>Promotion.name, Promotion);
        Vue.component(<any>Iphone.name, Iphone);
        Vue.component(<any>Camera.name, Camera);
        Vue.component(<any>Film.name, Film);
        Vue.component(<any>Opportunity.name, Opportunity);
    }
}