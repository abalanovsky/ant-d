import React, { useState, useRef } from 'react';
import './index.css';
import {Button, Tabs, Table, Calendar, Tree, Dropdown, Carousel, Image, Menu} from 'antd';

const contentGenerationTemplate = {
  title: '',
  body: '',
  author: ''
}

const defaultTabs = new Array(5).fill(null).map((_, index) => {
  const id = String(index + 1);
  return {
    label: `Tab ${id}`,
    children: `Контент який знаходиться у цій вкладці ${index + 1}`,
    key: id,
  }
});

const App = () => {
  const [activeKey, setActiveKey] = useState(defaultTabs[0].key);
  const [items, setItems] = useState(defaultTabs);
  const newTabIndex = useRef(0);

  const onChange = (key) => {
    setActiveKey(key);
  }

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;

    setItems([
      ...items,
      { label: 'Нова вкладка', children: 'Нова вкладка та її контент', key: newActiveKey}
    ]);
    setActiveKey(newActiveKey);
  }

  const remove = (tabKey) => {
    const keyIndex = items.findIndex((tab) => tab.key === tabKey);
    const newTabs = items.filter((tab) => tab.key !== tabKey);
    if(newTabs.length && tabKey === activeKey){
      const { key } = newTabs[keyIndex === newTabs.length ? keyIndex - 1 : keyIndex];
      setActiveKey(key);
    }
    setItems(newTabs);
  }

  const onEdit = (tabKey, action) => {
    if(action === 'add') {
      add();
    } else {
      remove(tabKey);
    }
  }

  const generateRandomContent = () => {
    const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
        "Sed vitae est sed nibh commodo aliquet. Proin tincidunt pharetra nunc, vel " +
        "tempus enim venenatis in. Sed a nisi ipsum. Nullam id efficitur quam. Vestibulum " +
        "ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque " +
        "vitae tristique ligula. Nulla ut varius elit. Nunc nec libero magna. Donec a nisi vitae" +
        " metus lobortis sollicitudin.";

    const components = [
      <Table dataSource={[{name: 'John Doe', age: 25, occupation: 'Software Engineer'}]} columns={[{title: 'Name', dataIndex: 'name'}, {title: 'Age', dataIndex: 'age'}, {title: 'Occupation', dataIndex: 'occupation'}]} />,
      <Calendar />,
      <Tree
          showLine
          defaultExpandedKeys={['0-0-0']}
          treeData={[
            {
              title: 'Node 0-0',
              key: '0-0',
              children: [
                { title: 'Node 0-0-0', key: '0-0-0' },
                { title: 'Node 0-0-1', key: '0-0-1' },
              ],
            },
          ]}
      />,
      <Dropdown overlay={<Menu><Menu.Item key="1">Option 1</Menu.Item>
        <Menu.Item key="2">Option 2</Menu.Item></Menu>}><Button>Dropdown</Button></Dropdown>,
      <Carousel autoplay>
        <div><Image src="https://images.unsplash.com/photo-1682686581427-7c80ab60e3f3?ixlib=rb-4.0.3&ixid=M3wx
              MjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" /></div>
        <div><Image src="https://images.unsplash.com/photo-1684336177311-b34743d99c5c?ixlib=rb-4.0.3&ixid=M3wx
              MjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1002&q=80" /></div>
        <div><Image src="https://plus.unsplash.com/premium_photo-1678116087019-a86085e17cac?ixlib=rb-4.0.3&ixid=
              M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDBф8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" /></div>
      </Carousel>,
      <div>{loremIpsum}</div>,
    ];
    const randomIndex = Math.floor(Math.random() * components.length);
    return components[randomIndex];
  };

  const renderTabContent = (tabKey) => {
    if (tabKey.startsWith('newTab')) {
      return generateRandomContent();
    } else {
      const tab = items.find((item) => item.key === tabKey);
      return tab?.children;
    }
  };

  return (
        <div style={{ width: '100%' }}>
          <div style={{ marginBottom: 15 }}>
            <Button onClick={add}>
              Додати вкладку
            </Button>
          </div>
          <Tabs
              hideAdd
              onChange={onChange}
              activeKey={activeKey}
              type="editable-card"
              onEdit={onEdit}
          >
            {items.map((item) => (
                <Tabs.TabPane tab={item.label} key={item.key}>
                  {renderTabContent(item.key)}
                </Tabs.TabPane>
            ))}
          </Tabs>
        </div>
  );
}

export {
  App as Demo
}
