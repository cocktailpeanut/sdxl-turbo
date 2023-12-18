module.exports = {
  title: "sdxl turbo",
  description: "A Real-Time Text-to-Image Generation Model",
  icon: "icon.png",
  menu: async (kernel) => {
    let installed = await kernel.exists(__dirname, "env")
    let installing = await kernel.running(__dirname, "install.json")
    if (installing) {
      return [{
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.json",
        params: { fullscreen: true }
      }]
    } else if (installed) {
      let session = await kernel.require(__dirname, "session.json")
      console.log("session", session)
      let running = await kernel.running(__dirname, "start.json")
      if (running) {
        if (session && session.url) {
          return [{
            icon: "fa-solid fa-spin fa-circle-notch",
            text: "Running",
            type: "label",
          }, {
            icon: "fa-solid fa-terminal", text: "Terminal", href: "start.json", params: { fullscreen: true }
          }, {
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: session.url,
            target: "_blank"
          }]
        } else {
          return [{
            icon: "fa-solid fa-spin fa-circle-notch",
            text: "Running",
            type: "label",
          }, {
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: session.url,
            target: "_blank"
          }]
        }
      } else {
        return [{
          icon: "fa-solid fa-power-off", text: "Start", href: "start.json", params: { run: true, fullscreen: true }
        }]
      }
    } else {
      return [{
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.json",
        params: { run: true, fullscreen: true }
      }]
    }
  }
}
