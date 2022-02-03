const formatLogMessage = input => {
  let message

  if (typeof input === `string`) {
    message = input
  } else {
    message = input[0]
  }

  return "\x1b[36mgatsby-theme-headless-wordpress \033[0m" + message + "\033[0m"
}

exports.formatLogMessage = formatLogMessage
