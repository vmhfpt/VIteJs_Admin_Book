import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import {
    ImageInsert,
    ImageInline,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    ImageResizeEditing, 
    ImageResizeHandles,
    ImageResizeButtons,
    ImageBlock,
    AutoImage 
} from '@ckeditor/ckeditor5-image';
import { CodeBlock } from '@ckeditor/ckeditor5-code-block';
import { Alignment } from '@ckeditor/ckeditor5-alignment'; 
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
//import { CKFinder } from '@ckeditor/ckeditor5-ckfinder';
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';
export default class ClassicEditor extends ClassicEditorBase {}


ClassicEditor.builtinPlugins = [
   
    ImageBlock,
    
    ImageInline,
    ImageResizeEditing, ImageResizeHandles,
    SimpleUploadAdapter,
    HorizontalLine,
    Alignment,
    Essentials,
    Autoformat,
    Bold,
    Italic,
    BlockQuote,
    Heading,
    Link,
    List,
    Paragraph,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    CodeBlock,
    ImageResizeButtons,
    ImageInsert,
    AutoImage 
];

ClassicEditor.defaultConfig = {
    
    toolbar: {
        items: [
            'horizontalLine',
            'alignment',
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'blockQuote',
            'codeBlock',
            'undo',
            'redo',
            'imageUpload',
            'insertImage'
        ]
    },
    language: 'en',
    image: {
        toolbar: [
            'imageTextAlternative',
            'toggleImageCaption',
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
            'resizeImage:50',
            'resizeImage:75',
            'resizeImage:original',
        ],
        resizeOptions: [
            {
                name: 'resizeImage:original',
                value: null,
                icon: 'original'
            },
            {
                name: 'resizeImage:50',
                value: '50',
                icon: 'medium'
            },
            {
                name: 'resizeImage:75',
                value: '75',
                icon: 'large'
            }
        ],
        
    },
    simpleUpload: {
        // The URL that the images are uploaded to.
        uploadUrl: 'http://localhost:5000/upload',

        // Enable the XMLHttpRequest.withCredentials property.
        withCredentials: true,

        // Headers sent along with the XMLHttpRequest to the upload server.
        // headers: {
        //     'X-CSRF-TOKEN': 'CSRF-Token',
        //     Authorization: 'Bearer <JSON Web Token>'
        // }
    },
    CodeBlock: {
        languages:  [
            { language: 'plaintext', label: 'Plain text' }, // The default language.
            { language: 'c', label: 'C' },
            { language: 'cs', label: 'C#' },
            { language: 'cpp', label: 'C++' },
            { language: 'css', label: 'CSS' },
            { language: 'diff', label: 'Diff' },
            { language: 'html', label: 'HTML' },
            { language: 'java', label: 'Java' },
            { language: 'javascript', label: 'JavaScript' },
            { language: 'php', label: 'PHP' },
            { language: 'python', label: 'Python' },
            { language: 'ruby', label: 'Ruby' },
            { language: 'typescript', label: 'TypeScript' },
            { language: 'xml', label: 'XML' }
        ],
        defaultLanguage: 'javascript',
       
    },
  
};