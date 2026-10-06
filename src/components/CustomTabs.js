import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function CustomTabs({ weapons, armor, spells, equipped, tabType }) {
  const [key, setKey] = useState("home");

  return (
    <div id="tabs-container" style={{ marginLeft: "5rem", marginRight: "5rem" }}>
      <label style={{ color: '#5c2e22', fontSize: '25px', fontWeight: 'semibold', textDecoration: 'underline' }}>
        {tabType === "inventory" ? "Inventory" : "Store"}
      </label>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab id="weapons-tab" eventKey="home" title="Weapons">
          <div className="tabContent">{weapons}</div>
        </Tab>
        <Tab id="armor-tab" eventKey="armor" title="Armor">
          <div className="tabContent">{armor}</div>
        </Tab>
        <Tab id="spells-tab" eventKey="spells" title="Spells">
          <div className="tabContent">{spells}</div>
        </Tab>
        {equipped && (
          <Tab id="equipped-tab" eventKey="equipped" title="Equipped">
            <div className="tabContent">{equipped}</div>
          </Tab>
        )}
      </Tabs>
    </div>
  );
}

export default CustomTabs;
