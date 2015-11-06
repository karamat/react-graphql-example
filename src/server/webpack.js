import WebpackDevServer from "webpack-dev-server";  
import webpack from "webpack";  
import config from "../../webpack.config.dev";

var server = new WebpackDevServer(webpack(config), {  
  // webpack-dev-server options
  proxy: {'/graphql': `http://localhost:3002`},
  publicPath: config.output.publicPath,
  hot: true,
  stats: { colors: true },
});

server.listen(8080, "localhost", function() {});  