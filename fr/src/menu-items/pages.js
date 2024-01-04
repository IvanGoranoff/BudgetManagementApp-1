// assets
import { IconKey, IconMoneybag } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconMoneybag
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Pages',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Authentication',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'login3',
          title: 'Login',
          type: 'item',
          url: '/pages/login/login3',
          target: true
        },
        {
          id: 'register3',
          title: 'Register',
          type: 'item',
          url: '/pages/register/register3',
          target: true
        }
      ]
    },
    {
      id: 'pages',
      title: 'My Money',
      type: 'collapse',
      icon: icons.IconMoneybag,
      children: [
        {
          id: 'needs',
          title: 'Needs',
          type: 'item',
          url: '/sample-page',
          target: true
        },
        {
          id: 'wants',
          title: 'Wants',
          type: 'item',
          url: '/sample-page',
          target: true
        },
        {
          id: 'save',
          title: 'Save',
          type: 'item',
          url: '/sample-page',
          target: true
        }
      ]
    }
  ]
};

export default pages;
