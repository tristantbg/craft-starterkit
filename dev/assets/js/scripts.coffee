# Namespacing support
# https://github.com/jashkenas/coffee-script/wiki/FAQ#unsupported-features
namespace = (target, name, block) ->
  [target, name, block] =
    [(if typeof exports isnt 'undefined' then exports else window),
    arguments...] if arguments.length < 3
  top    = target
  target = target[item] or= {} for item in name.split '.'
  block target, top

# App scripts
namespace "Medtrak", (exports) ->

  exports.navbarInfo = ->

    cancel = $(".request-info-cancel")
    collapse = $(".navbar-info-collapse")
    input = collapse.find(".request-info-input").first()
    toggle = $(".navbar-info-toggle")

    toggle.on "click", (e) ->
      e.preventDefault()
      collapse.addClass "js--visible"
      input.focus()
      return

    cancel.on "click", (e) ->
      e.preventDefault()
      input.blur()
      collapse.removeClass "js--visible"
      return

    return

  exports.responsiveVideos = (wrappers = $(".video-embed")) ->
    wrappers.fitVids()
    return

  exports.videoMasks = (masks = $(".video-mask")) ->
    masks.on "click", (e) ->
      e.preventDefault()
      mask = $(this)
      mask.fadeOut(300)
      return
    return

  # Initialization scripts
  (exports.init = ->
    $("html").removeClass "no-js"
    Medtrak.navbarInfo()
    Medtrak.responsiveVideos()
    Medtrak.videoMasks()
    return
  )()

  return
