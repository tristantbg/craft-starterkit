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
namespace "App", (exports) ->

  # Example function
  exports.hello = (subject = "world") ->
    console.log "Hello, " + subject + "."
    return

  # Initialization scripts
  (exports.init = ->
    $("html").removeClass "no-js"
    App.hello("there")
    return
  )()

  return
